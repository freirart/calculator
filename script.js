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
    var op = [];
    var operations = {
        '+': function(a, b){return a + b},
        '-': function(a, b){return a - b},
        'x': function(a, b){return a * b},
        '÷': function(a, b){return a / b},
        '%': function(a, b){return a % b},
    };

    var restart = false;
    var def = true;

    function calculate(numbers, op){
        return Number(operations[op](numbers[0], numbers[1]).toFixed(2));
    }

    function isNull(){
        //the 'or' operator condition is used in the backspace function
        return $output.innerHTML === '0' || $output.innerHTML === ''; 
    }

    function isPi(value){
        return value === 'π';
    }

    function clearAll(){
        $output.innerHTML = '0';
        $previous.innerHTML = '';
        numbers = [];
        op = [];
        isDefault(true);
    }

    function isDefault(check){
        check !== undefined ? def = check : '';
        !check ? $output.classList.remove('res-system') : $output.classList.add('res-system');
        return def;
    }

    $btnNumber.forEach((element) => {
        element.addEventListener('click', function(){
            restart ? clearAll() : '';
            restart = false;
            isNull() ? $output.innerHTML = element.innerHTML : $output.innerHTML += element.innerHTML;
            isDefault(false);
        }, false);
    });

    $btnOperator.forEach((element) => {
        element.addEventListener('click', function(){
            var output = $output.innerHTML;
            if(element.innerHTML !== '.'){
                if(!isNull() || !isDefault()){
                    isPi(output) ? numbers.push(Math.PI) : numbers.push(+output.replace(' ', ''));
                    op.push(element.innerHTML.toLowerCase());
                    if(numbers[1] === undefined){
                        $previous.innerHTML = output +  ' ' + op[0] + ' ';
                        restart = false;
                    }else{
                        var calc = calculate(numbers, op[0]);
                        $previous.innerHTML = calc +  ' ' + op[1] + ' ';
                        op.shift();
                        numbers = [calc];
                        restart = false;
                    }
                    $output.innerHTML = '0';
                    isDefault(true);
                    
                }else{
                    if(element.innerHTML === '-') {
                        $output.innerHTML = element.innerHTML.toLowerCase() + ' ';
                        restart = false;
                    }
                    
                }
            }else{
                if(!output.match(/\./g)){
                    $output.innerHTML += '.';
                    restart = false;
                }
            }
        }, false);
    });

    $btnBackspace.addEventListener('click', function(){
        var output = $output.innerHTML;

        $output.innerHTML = output.slice(0, output.length-1);

        isNull() ? $output.innerHTML = '0' : '';

    }, false);

    $btnCE.addEventListener('click', clearAll, false);

    $equals.addEventListener('click', function(){
       
        var output = $output.innerHTML;

        if($previous.innerHTML !== ''){
            isPi(output) ? numbers.push(Math.PI) : numbers.push(+$output.innerHTML);
            $previous.innerHTML += output + ' = ';
            $output.innerHTML = calculate(numbers, op);
            numbers = [];
            op = [];
            restart = true;
        }else if(isPi(output)){
            $previous.innerHTML += output + ' = ';
            $output.innerHTML = Math.PI.toFixed(2);
            restart = true;
        }
        
    }, false);

    


})(window, document);