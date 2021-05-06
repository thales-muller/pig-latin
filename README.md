# TestKSI
This project is a way to solve the translation problem with the Pig Latin language
## Pig Latin Translator
### Description

An ancient language was recently uncovered which appears to be a close English language derivative. A group
of researchers requires a program to translate English into this ancient text. Your task is to write a simple
program to perform basic English to foreign language translation.

### Translation rules

1. If a word has no letters, don't translate it.
2. All punctuation should be preserved.
3. If the word begins with a capital letter, then the translated word should too.
4. Separate each word into two parts. The first part is called the “prefix” and extends from the beginning of the
word up to, but not including, the first vowel. (The letter “y” will be considered a vowel.) The Rest of the
word is called the “stem.”
5. The translated text is formed by reversing the order of the prefix and stem and adding the letters “ay” to the
end. For example, “sandwich” is composed of “s” + “andwich” + “ay” + “.” and would translate to
“andwichsay.”
6. If the word contains no consonants, let the prefix be empty and the word be the stem. The word ending
should be “yay” instead of merely “ay.” For example, “I” would be “Iyay.”