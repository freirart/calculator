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

    function calculate(numbers, op){
        return Number(operations[op](numbers[0], numbers[1]).toFixed(2));
    }

    function isNull(){
        return $output.innerHTML === '0' || $output.innerHTML === '';
    }

    $btnNumber.forEach((element) => {
        element.addEventListener('click', function(){
            isNull() ? $output.innerHTML = element.innerHTML: $output.innerHTML += element.innerHTML;
        }, false);
    });

    $btnOperator.forEach((element) => {
        element.addEventListener('click', function(){
            if(element.innerHTML !== '.'){
                op = element.innerHTML.toLowerCase();
                numbers.push(+$output.innerHTML);
                $previous.innerHTML = $output.innerHTML +  ' ' + element.innerHTML.toLowerCase() + ' ';
                $output.innerHTML = '0';
            }else{
                $output.innerHTML += '.';   
            }
        }, false);
    });

    $btnBackspace.addEventListener('click', function(){
        var output = $output.innerHTML;

        if(output.length > 3){
            var lastChar = output.endsWith(' ') ? output.slice(output.length-3) : output.slice(output.length-1);
        }else{
            var lastChar = output.endsWith(' ') ? output.slice(output.length-2) : output.slice(output.length-1);
        }

        $output.innerHTML = output.replace(lastChar, '');
        
        isNull() ? $output.innerHTML = '0' : '';

    }, false);

    $btnCE.addEventListener('click', function(){
        $output.innerHTML = '0';
        $previous.innerHTML = '';
        numbers = [];
        op = '';
    }, false);

    $equals.addEventListener('click', function(){
       
        if($previous.innerHTML !== ''){
            $previous.innerHTML += $output.innerHTML + ' = ';
            
            if($output.innerHTML === 'π'){
                if($output.innerHTML !== ''){
                    numbers.push(Math.PI);
                    $output.innerHTML = calculate(numbers, op);
                    numbers = [];
                }else{
                    $output.innerHTML = Math.PI.toFixed(2);
                }
            }else{
                numbers.push(+$output.innerHTML);
                $output.innerHTML = calculate(numbers, op);
                numbers = [];
            }
        }
        
    }, false);


})(window, document);