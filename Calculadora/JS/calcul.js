// crates an object to keep track of values
const Calculator = {
    // this is display 0 on the screen
    Display_Value: '0',
    //this will hold the first operdand for any expressions, we set it to null for
    First_Operand: null,
    // this will hold the operator we set it to null for now
    Wait_Second_Operand: false,

    operator: null,
    };

    //this modifies values each time a buttom is clicked
    function Input_Digit(digit){
        const { Display_Value, Wait_Second_Operand } = Calculator;
        // we are checking to see if wait second operand is true and set
        //display value to the key that was clicked
        if(Wait_Second_Operand === true){
            Calculator.Display_Value = digit;
            Calculator.Wait_Second_Operand = false;

        } else {
            //this overwrites Display value if the current value is 0
            //otherwise it adds onto it
            Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;

        }
    }
    //this section handles decimal points
    function Input_Decimal (dot){
        //this ensures that accidental clicking of the decimal point
        //does not cause bug in your operation
        if (Calculator.Wait_Second_Operand === true) return;
        if(!Calculator.Display_Value.includes(dot)) {
            //we are saying that if he display value does not contain a decimal point
            //we want to add a decimal point
            Calculator.Display_Value += dot;
        }
    }

    //this section handles operators
    function Handle_Operator(Next_Operator){
        const { First_Operand, Display_Value, operator} = Calculator
        //when an operator key is pressed we convert the current number
        //dispplayed on the screen to a number and then store the result in
        // calculator.firtoperand if it does not already exist
        const Value_of_Input = parseFloat(Display_Value);
        //check if an operator already exists and if wait seconf operand is true
        //then updates thee operator and exist from the function
        if (operator && Calculator.Wait_Second_Operand) {
            Calculator.operator = Next_Operator;
            return;
        }
        if (First_Operand == null){
            Calculator.First_Operand = Value_of_Input;
        }else if (operator) {            //cheacks if an operator already exists
            const Value_Now = First_Operand || 0 ;
            //if operator exists, property lookup is perfomed for the operator
            //in the perform calculation object and the function that matches the
            //operator is executed
            let result = Perform_Calculation[operator](Value_Now, Value_of_Input);
            //here we add a fixed amount of number after the decimal
            result = Number(result).toFixed(9)
            //this will remove any trailing 0s
            result = (result * 1).toString()
            Calculator.Display_Value = parseFloat(result);
            Calculator.First_Operand = parseFloat(result);
            
        }
        Calculator.Wait_Second_Operand = true;
        Calculator.operator = Next_Operator;

    }

    const Perform_Calculation = {
        '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
        '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
        '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
        '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
        '=': (First_Operand, Second_Operand) => Second_Operand
    };
    
    function Calculator_Reset() {
        Calculator.Display_Value = '0';
        Calculator.First_Operand = null;
        Calculator.Wait_Second_Operand = false;
        Calculator.operator = null;
    }
    
    // esta funcion actualiza la pantalla con el contenido de Display_Value
    function Update_Display() {
        const display = document.querySelector('.calculator-screen');
        display.value = Calculator.Display_Value;
    }
    
    Update_Display();
    //esta seccion supervisa los clics de los botones
    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        // la variable de destino respresenta un objeto al que se le hizo click
        const { target } = event;
        // si al elemento al que se le hizo click no es un boton, salga de la funcion
        if (!target.matches('button')) {
            return;
        }
    
        if (target.classList.contains('operator')) {
            Handle_Operator(target.value);
            Update_Display();
            return;
        }
    
        if (target.classList.contains('decimal')) {
            Input_Decimal(target.value);
            Update_Display();
            return;
        }
        // asegura que AC borre los numeros de la calculadora
        if (target.classList.contains('all-clear')) {
            Calculator_Reset();
            Update_Display();
            return;
        }
    
        Input.Digit(target.value);
        Update_Display();
    })
