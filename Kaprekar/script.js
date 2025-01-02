let digitType = 3;

function startRoutine(type) {
    digitType = type;
    document.getElementById("input-section").style.display = "flex";
    document.getElementById("input-prompt").innerText = 
        `Enter a ${type}-digit number with at least two different digits:`;
    document.getElementById("output").innerHTML = "";
}

function isPalindrome(numStr) {
    return numStr === numStr.split('').reverse().join('');
}

function runRoutine() {
    const numInput = parseInt(document.getElementById("number-input").value, 10);
    const min = digitType === 3 ? 100 : 1000;
    const max = digitType === 3 ? 999 : 9999;
    const kaprekarConstant = digitType === 3 ? 495 : 6174;

    if (numInput < min || numInput > max) {
        alert(`Please enter a valid ${digitType}-digit number.`);
        return;
    }

    let num = numInput;
    let steps = 0;
    let outputHTML = `<p>Starting number: ${num}</p>`;

    while (num !== kaprekarConstant) {
        const numStr = num.toString().padStart(digitType, '0');
        if (isPalindrome(numStr)) {
            outputHTML += `<p>Step ${steps}: ${numStr} is a palindrome. Replacing with ${kaprekarConstant}.</p>`;
            num = kaprekarConstant;
        } else {
            const descending = parseInt([...numStr].sort((a, b) => b - a).join(''), 10);
            const ascending = parseInt([...numStr].sort((a, b) => a - b).join(''), 10);
            num = descending - ascending;
            steps++;
            outputHTML += `<p>Step ${steps}: ${descending} - ${ascending} = ${num}</p>`;
        }
    }

    outputHTML += `<p><strong>Kaprekar's constant ${kaprekarConstant} reached in ${steps} steps.</strong></p>`;
    document.getElementById("output").innerHTML = outputHTML;
}
