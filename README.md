# ZohoTask
<html>
<body>

    <h1>Javascript length of string using recursion</h1>
    <meta charset="utf-8">

<script>
function Length(str)
{
        if (str === "")
            return 0;
        else
            return Length(str.substr(1)) + 1 ;

}

console.log(Length("asdf"));

</script>
</body>
</html>
        
