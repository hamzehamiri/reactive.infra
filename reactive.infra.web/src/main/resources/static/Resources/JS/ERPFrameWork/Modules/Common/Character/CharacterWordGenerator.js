import CharacterMatrix from "./CharacterMatrix.js";

export default class CharacterWordGenerator {

    static StandardCharMap() {
        let newMap = new Map();
        newMap.set(1, '█');
        newMap.set(0, ' ');
        newMap.set(2, '═');
        newMap.set(3, '╗');
        newMap.set(4, '║');
        newMap.set(5, '╝');
        newMap.set(6, '╔');
        newMap.set(7, '╝');
        newMap.set(8, '╠');
        newMap.set(9, '╣');
        newMap.set(10, '░');
        return newMap
    }

    static WordGenerator(word, charMap) {
        let chars = word.split('');
        let charMonitorMatrix = [];
        for (let row = 0; row < chars.length; row++) {
            let matrixChar = CharacterMatrix.Character_letters[chars[row]];
            for (let charIndex = 0; charIndex < matrixChar.length; charIndex++) {
                let rowNewChar = matrixChar[charIndex];
                if (!charMonitorMatrix[charIndex])
                    charMonitorMatrix[charIndex] = [];
                charMonitorMatrix[charIndex].push(...rowNewChar);
            }
        }
        console.info(CharacterWordGenerator.WordPrint(charMonitorMatrix, charMap));
    }

    static WordPrint(matrixChar, charMap) {
        let charMask = '';
        matrixChar.forEach(arrayRow => {
            arrayRow.forEach(charBit => {
                charMask += charMap.get(charBit);
            });
            charMask += '\n';
        });
        return charMask;
    }
}