<?
if ($_POST) {
    
    $name = clean($_POST['name']);
    $phone = clean($_POST['phone']);
    
    if(!empty($name) && !empty($phone))  {

        $date = date('Y-m-d H:i:s');
        $string = $date.';'.$name.';'.$phone.';';
        $f = fopen('feedback.txt', 'a');
        fwrite($f, $string . PHP_EOL);
        fclose($f);

        mail(
        "franch@shop.toy.ru,s.murashko@toy.ru", //<== шлем сюды
        "Заявка с сайта",
        "Имя: ".$name.PHP_EOL.
        "Телефон: ".$phone.PHP_EOL.
        "From: franch@shop.toy.ru \r\n");   
        
        echo "Заявка отправлена";

    }
    else {
        echo "Введенные данные некорректные. Форма не отправлена";
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