<?
if ($_POST) {
    
    $name = clean($_POST['name']);
    $email = clean($_POST['email']);
    $phone = clean($_POST['phone']);
    
    if(!empty($name) && (!empty($email) or !empty($phone)))  {

        $date = date('Y-m-d H:i:s');
        $string = $date.';'.$name.';'.$email.';'.$phone.';';
        $f = fopen('feedback.txt', 'a');
        fwrite($f, $string . PHP_EOL);
        fclose($f);

        mail(
        "franch@shop.toy.ru,s.murashko@toy.ru", //<== шлем сюды
        "Заявка с сайта franchise.toy.ru",
        "Имя: ".$name.PHP_EOL.
        "E-mail: ".$email.PHP_EOL.
        "Телефон: ".$phone.PHP_EOL.
        "From: franch@shop.toy.ru \r\n");   
        
        echo "Заявка отправлена";

    }
    else {
        echo "Заполните все необходимые поля. Форма не отправлена";
    };

}

function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}

?>