(function(win, doc){
    'use strict';
    var $btnNumber = doc.querySelectorAll('span[data-js="number"]');
    var $btnOperator = doc.querySelectorAll('span[data-js="operator"]');
    var $btnBackspace = doc.querySelector('span[data-js="backspace"]');
    var $btnCE = doc.querySelector('span[data-js="ce"]');
    var $output = doc.querySelector('span[data-js="output"]');
    var $equals = doc.querySelector('span[data-js="equals"]');

    function isNull(){
        return $output.innerHTML === '0' || $output.innerHTML === '';
    }

    $btnNumber.forEach((element) => {
        element.addEventListener('click', function(){
            isNull() ? $output.innerHTML = element.innerHTML : $output.innerHTML += element.innerHTML;
        }, false);
    });

    $btnOperator.forEach((element) => {
        element.addEventListener('click', function(){

            //some operators have a proper treatment, therefore, the if's are necessary.
            if(element.innerHTML === 'x²'){
                $output.innerHTML += ' ' + '^' + ' ';    
            }else if(element.className === 'operator sqroot'){
                $output.innerHTML += ' ' + '√' + ' ';    
            }else{
                $output.innerHTML += ' ' + element.innerHTML.toLowerCase() + ' ';
            }

        }, false);
    });

    $btnBackspace.addEventListener('click', function(){
        var output = $output.innerHTML;

        var lastChar = output.endsWith(' ') ? output.slice(output.length-3) : output.slice(output.length-1);

        $output.innerHTML = output.replace(lastChar, '');
        
        isNull() ? $output.innerHTML = '0' : '';
    }, false);

    $btnCE.addEventListener('click', function(){
        $output.innerHTML = '0';
    }, false);

    $equals.addEventListener('click', function(){
        var expression = $output.innerHTML;

        console.log(expression.split(' '));

    }, false);


})(window, document);