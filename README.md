# 🧼 bad-word-cli

A colorful and user-friendly CLI tool to **detect** and **clean profane words** using the [`bad-words`](https://www.npmjs.com/package/bad-words) package.

---

## 📦 Installation

### Globally via npm:

```bash
npm install -g bad-word-cli
```

bad-word-cli isProfane <string> [--example]

## Check if "hell" is profane

```bash
bad-word-cli isProfane "hell"
```

### 🚫 Profane

## Check a clean word

```bash
bad-word-cli isProf "hello"
```

### ✅ Clean

## Show usage example

```bash
bad-word-cli isProf "example" --example
```

```bash
bad-word-cli clean <string> [options]
```

## Clean a default profane word

```bash
bad-word-cli clean "assh0le"
```

### 🧼 Cleaned: **\*\*\***

## Add a custom word and clean

```bash
bad-word-cli clean "this is a badword" -a badword
```

### 🧼 Cleaned: this is a **\*\*\***

## Remove a default profane word from the filter

```bash
bad-word-cli clean "damn nice" -r damn
```

###🧼 Cleaned: damn nice

## Show usage example

```bash
bad-word-cli clean "example" --example
```

## Clean and overwrite original file

```bash
bad-word-cli file ./input.txt -r
```

## 🔁 File rewritten: /full/path/input.txt

### Clean and save to a new file

```bash
bad-word-cli file ./input.txt -n cleaned.txt
```

## 📄 Cleaned file saved as: /full/path/cleaned.txt

### Print cleaned content to console (no options)

```bash
bad-word-cli file ./input.txt
```

## Show usage example

```bash
bad-word-cli file ./input.txt --example
```

# 🧪 Bonus: Show Examples with --example

### All commands support --example to show a real use case:

```bash
bad-word-cli clean "text here" --example
bad-word-cli file ./sample.txt --example
bad-word-cli isProf "word" --example
```
