const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters of text for the logo:',
        validate: function (input) {
            // Make sure no more than 3 characters of text are entered
            if (input.length > 3) {
            return 'Please only enter 3 characters';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a text color or valid hexadecimal number:',
        validate: function (input) {
            if(!/^#[0-9A-Fa-f]{6}$|^[a-zA-Z]+$/.test(input)) {
                return 'Please enter a valid color or hexadecimal number.'
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'logoShape',
        message: 'Select a shape for your logo:',
        choices: ['circle','triangle','square'],
        default: 'circle'
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a shape color or valid hexadecimal number:',
        validate: function (input) {
            if(!/^#[0-9A-Fa-f]{6}$|^[a-zA-Z]+$/.test(input)) {
                return 'Please enter a valid color or hexadecimal number.'
            }
            return true;
        }
    }

]).then((answers) => {
        const text = answers.text;
        const textColor = answers.textColor;
        const logoShape = answers.logoShape;
        const shapeColor = answers.shapeColor;
        const textY = 100 + 10
        const textX = 150;
        
        let svgParameters = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        <rect width="0%" height="0%" fill="${shapeColor}" />`;    
       
            switch (logoShape) {
              case 'circle':
                svgParameters += `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
                break;
              case 'triangle':
                svgParameters += `<polygon points="150,20 250,180 50,180" fill="${shapeColor}" />`;
                break;
              case 'square':
                svgParameters += `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
                break;
            }
            svgParameters += `<text x="${textX}" y="${textY}" fill="${textColor}" text-anchor="middle">${text}</text> </svg>`;
    
        fs.writeFile('logo.svg', svgParameters, (err) => {
            if(err){
                console.log('SVG file not created', err)
            } 
            else {
                console.log('SVG file created as logo.svg')
            }
        });
    
    })
.catch(error => {
    console.log('Error:', error);
})

