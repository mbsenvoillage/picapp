<!doctype html>
<html lang="fr">
<body>

<h1>hello</h1>

    <div id="li">

    </div>

    <script type='text/javascript'>

        let div = document.getElementById("li");
        console.log(div);

        let storePics = (arr) => {
            arr.forEach(el => {
                let url = el;
                let a = document.createElement('a');
                a.setAttribute('href', url);
                a.innerText = "Link";
                div.appendChild(a);
            })
        }
        (function load_photos(){
            fetch('../src/api/api.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                });
        })();

        (function load_pics(cb){
            fetch('../src/api/userpic.php')
                .then(response => response.json())
                .then(data => {
                    cb(data);
                });
        })(storePics);




    </script>
</body>
</html>

