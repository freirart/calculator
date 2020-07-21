(function(win, doc){
    'use strict';
    var $btnNumber = doc.querySelectorAll('span[data-js="number"]');
    var $btnOperator = doc.querySelectorAll('span[data-js="operator"]');
    var $btnBackspace = doc.querySelector('span[data-js="backspace"]');
    var $btnCE = doc.querySelector('span[data-js="ce"]');
    var $output = doc.querySelector('span[data-js="output"]');
    var $equals = doc.querySelector('span[data-js="equals"]');
    var $previous = doc.querySelector('span[data-js="previous"]');

    var numbers = [];
    var op = '';
    var operations = {
        '+': function(a, b){return a + b},
        '-': function(a, b){return a - b},
        'x': function(a, b){return a * b},
        '/': function(a, b){return a / b},
        '%': function(a, b){return a % b},
    };

    var isAnAnswer = false;     //when a number is typed after the answer is given, the outputs vanish

    function calculate(numbers, op){
        return Number(operations[op](numbers[0], numbers[1]).toFixed(2));
    }

    function isNull(){
        return $output.innerHTML === '0' || $output.innerHTML === '';
    }

    function isPi(value){
        return value === 'π';
    }

    function clearAll(){
        $output.innerHTML = '';
        $previous.innerHTML = '';
        numbers = [];
        op = '';
        isAnAnswer = false;
    }

    $btnNumber.forEach((element) => {
        element.addEventListener('click', function(){
            isAnAnswer ? clearAll() : '';
            isNull() ? $output.innerHTML = element.innerHTML: $output.innerHTML += element.innerHTML;
        }, false);
    });

    $btnOperator.forEach((element) => {
        element.addEventListener('click', function(){
            var output = $output.innerHTML;
            if(element.innerHTML !== '.'){
                if(!isNull()){
                    op = element.innerHTML.toLowerCase();
                    isPi(output) ? numbers.push(Math.PI) : numbers.push(+output.replace(' ', ''));
                    $previous.innerHTML = output +  ' ' + element.innerHTML.toLowerCase() + ' ';
                    $output.innerHTML = '0';
                }else{
                    if(element.innerHTML === '-') $output.innerHTML = element.innerHTML.toLowerCase() + ' ';
                }
            }else{
                if(!output.match(/\./g)) $output.innerHTML += '.';
            }
        }, false);
    });

    $btnBackspace.addEventListener('click', function(){
        var output = $output.innerHTML;

        $output.innerHTML = output.slice(0, output.length-1);
        
        isNull() ? $output.innerHTML = '0' : '';

    }, false);

    $btnCE.addEventListener('click', function(){
        $output.innerHTML = '0';
        $previous.innerHTML = '';
        numbers = [];
        op = '';
    }, false);

    $equals.addEventListener('click', function(){
       
        var output = $output.innerHTML;
        isAnAnswer = true;

        if($previous.innerHTML !== ''){
            isPi(output) ? numbers.push(Math.PI) : numbers.push(+$output.innerHTML);
            $previous.innerHTML += output + ' = ';
            $output.innerHTML = calculate(numbers, op);
            numbers = [];
        }else if(isPi(output)){
            $previous.innerHTML += output + ' = ';
            $output.innerHTML = Math.PI.toFixed(2);
        }
        
    }, false);

    


})(window, document);