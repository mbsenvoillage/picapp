<?php


namespace App\Controller;


class FileUploader
{

    protected $destination;
    protected $max = 2000000;
    protected $messages = array();
    protected $permittedExtensions = [
        IMAGETYPE_JPEG,
        IMAGETYPE_PNG
    ];
    protected $fileExt;

    /*$target_folder = "public/photos/";
$photo_id = sha1_file($_FILES["file"]["tmp_name"]);
$new_path = $target_folder . $photo_id . $extension;
move_uploaded_file($_FILES["file"]["tmp_name"], $new_path);*/


    public function __construct($path)
    {
        //provided path has to be valid, and dir needs to be writtable
        if(is_dir($path) && is_writable($path)) {
            //we ensure that the path does not contain white spaces and ends with a slash
            $this->destination = rtrim($path, '/\\') . DIRECTORY_SEPARATOR;
        } else {
            throw new \Exception("$path must be a valid and writtable directory");
        }
    }

    public function upload($inputFieldName)
    {
        $uploadedFile = $_FILES[$inputFieldName];
        if($this->checkFile($uploadedFile))
        {
            $this->moveFile($uploadedFile);
        }
    }

    public function renameFile($file)
    {
        return sha1_file($file['tmp_name']);
    }

    /**
     * @param $file
     * @return bool after running getErrorLevel, checkSize and checkType on $_FILES[$inputFieldName]
     */
    protected function checkFile($file)
    {
        return $this->getErrorLevel($file) && $this->checkSize($file) && $this->checkType($file);
    }

    /**
     * @param $file
     */
    public function moveFile($file)
    {
        $success = move_uploaded_file($file['tmp_name'], $this->destination . $this->renameFile($file) . $this->fileExt);
        if($success)
        {
            $msg = $file['name'] . ' a été transféré dans votre photothèque!';
            array_push($this->messages, $msg);
        }
        else
        {
            $this->messages = 'Could not upload ' . $file['name'];
        }
    }

    public function getMessages()
    {
        return $this->messages;
    }

    /**
     * @param $file
     * @return bool
     * amongst the $_FILES array a slot is reserved for error codes, this function updates the $messages array
     * according to the error code returned by $_FILES
     */
    protected function getErrorLevel($file)
    {
        switch ($file['error'])
        {
            case 0:
                return true;
                // file exceeds max upload size defined in php.ini
            case 1:
                // file exceeds max upload size defined by MAX_FILE_SIZE (form input)
            case 2:
                array_push($this->messages, $file['name'] . ' est trop volumineux: (max : ' . $this->getMaxSize() . ').');
                break;
            case 3:
                array_push( $this->messages, $file['name'] . ' n\'a été qu\'en partie transféré.');
                break;
                // Form was submitted with no file specified
            case 4:
                array_push( $this->messages, 'Aucun fichier n\'a été renseigné.');
                break;
            default:
                array_push( $this->messages, 'Un problème est survenu lors de l\'upload du fichier
                 ' . $file['name'] . '. Veuillez nous en excuser.');
                break;
        }
        return false;
    }

    /**
     * @param $file
     * @return bool
     * Adds messages for two extra cases that need to be addressed with regards to file size.
     * 1. User submits an empty file
     * 2. User bypasses MAX_FILE_SIZE and submits file that exceeds max size allowed
     */
    protected function checkSize($file)
    {
        // No need to add messages in the message array since getErrorLevel already took care of it for case 1 and 2
        if($file['error'] == 1 || $file['error'] == 2)
        {
            return false;
        }
        elseif ($file['size'] == 0)
        {
            array_push($this->messages, $file['name'] . ' est un fichier vide.');
            return false;
        }
        // Extra check in case user bypassed the MAX_FILE_SIZE limit set within the form
        elseif ($file['size'] > $this->max)
        {
            array_push($this->messages, $file['name'] . ' dépasse la taille maximum autorisée
            pour un fichier (' . $this->getMaxSize() . ').');
            return false;
        }
        return true;
    }

    protected function checkType($file)
    {

        foreach ($this->permittedExtensions as $ext)
        {
            if(exif_imagetype($file['tmp_name']) == $ext)
            {
                if($ext == IMAGETYPE_JPEG) $this->fileExt = '.jpg';
                if($ext == IMAGETYPE_PNG) $this->fileExt = '.png';
                return true;
            }
        }
        array_push($this->messages, $file['name'] . ' possède un format qui n\'est pas autorisé.');
        return false;
    }

    /**
     * @return string
     */
    public function getMaxSize()
    {
        // number_format takes 2 args. 1) value to be formatted 2) number of decimal places
        return number_format($this->max / 1024, 1) . ' KB';
    }

}