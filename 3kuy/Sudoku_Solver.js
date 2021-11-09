// https://www.codewars.com/kata/5296bc77afba8baa690002d7/train/javascript


let pazzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function sudoku(sudoku) {
    function SudokuSolver(sudokuStructure) {
        sudokuStructure.isSolved = sudokuStructure.values.filter((value) => value.value === null).length === 0 ? true : false;

        if (sudokuStructure.isSolved) {
            return buildSudokuArray(sudokuStructure.values)
        }
    }


    function SudokuParser(sudoku) {
        let sudokuStructure = { values: [], isSolved: false }
        for (let [lineIndex, lineValue] of sudoku.entries()) {
            for (let [squareIndex, squareValue] of lineValue.entries()) {
                sudokuStructure.values.push({
                    posX: squareIndex,
                    posY: lineIndex,
                    value: squareValue === 0 ? null : squareValue,
                })
            }
        }
        return SudokuEmptyValuesParser(sudokuStructure)

    }


    function SudokuEmptyValuesParser(sudokuStructure) {
        var needToReparse = false
        sudokuStructure = SudokuEmptyValueLinesCheker(sudokuStructure)
        while (sudokuStructure.values.findIndex(value => value.value === null && value.optionValues.length === 1) !== -1) {
            const idx = sudokuStructure.values.findIndex(value => value.value === null && value.optionValues.length === 1)
            sudokuStructure.values[idx].value = sudokuStructure.values[idx].optionValues[0]
            delete sudokuStructure.values[idx].optionValues
            needToReparse = true
        }
        if (needToReparse) {
            return SudokuEmptyValuesParser(sudokuStructure)
        } else {
            return SudokuSolver(sudokuStructure)
        }
    }


    function SudokuEmptyValueLinesCheker(sudokuStructure) {
        for (let [squareIndex, squareValue] of sudokuStructure.values.entries()) {
            if (squareValue.value === null) {
                sudokuStructure.values[squareIndex].optionValues = SudokuSetOptionToEmptyValue(squareValue, sudokuStructure.values)
            }
        }
        return sudokuStructure
    }


    function SudokuSetOptionToEmptyValue(emptyValue, allValues) {
        let allOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const posX = emptyValue.posX
        const posY = emptyValue.posY
        const checkSubSquarePosition = (valPos, pos) => {
            return Math.floor(pos / 3) === Math.floor(valPos / 3)
        }
        const LinesResult = allValues
            .filter((val) => {
                if ((val.posY === posY || val.posX === posX) || (checkSubSquarePosition(posX, val.posX) && checkSubSquarePosition(posY, val.posY)))
                    return val.value === null ? false : true;
            })
            .map((val) => val.value)
        return allOptions.filter((option) => {
            return LinesResult.indexOf(option) < 0
        })
    }

    // function SudokuGetMinOptionsValues(sudokuValues) {
    //     var result = 9
    //     for (let squareValue of sudokuValues) {
    //         if (squareValue.value === null && result > squareValue.optionValues.length) {
    //             result = squareValue.optionValues.length
    //         }
    //     }
    //     return result
    // }


    // function SudokuTryToResolveEmptyValuesWithTwoOptions(sudokuStructure) {
    //     const sudoksWithTwoOptions = sudokuStructure.values.filter(value => value.hasOwnProperty('optionValues') && value.optionValues.length == 2)
    //     for (let i = 0; i <= sudoksWithTwoOptions.length; i++) {

    //     }
    // }

    function buildSudokuArray(sudoku) {
        const res = []
        for (let i = 0; i <= 8; i++) {
            res.push(sudoku.filter(val => val.posY === i).map(val => val.value))
        }
        return res
    }
    return SudokuParser(sudoku);
}

console.log(sudoku(pazzle))