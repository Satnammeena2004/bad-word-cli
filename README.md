# 🧼 bad-word-cli

A colorful and user-friendly CLI tool to **detect** and **clean profane words** using the [`bad-words`](https://www.npmjs.com/package/bad-words) package.

---

## 📦 Installation

### Globally via npm:

```bash
npm install -g bad-word-cli
```

bad-word-cli isProfane <string> [--example]

# Check if "hell" is profane

bad-word-cli isProfane "hell"

# 🚫 Profane

# Check a clean word

bad-word-cli isProf "hello"

# ✅ Clean

# Show usage example

bad-word-cli isProf "example" --example

bad-word-cli clean <string> [options]

# Clean a default profane word

bad-word-cli clean "assh0le"

# 🧼 Cleaned: **\*\*\***

# Add a custom word and clean

bad-word-cli clean "this is a badword" -a badword

# 🧼 Cleaned: this is a **\*\*\***

# Remove a default profane word from the filter

bad-word-cli clean "damn nice" -r damn

# 🧼 Cleaned: damn nice

# Show usage example

bad-word-cli clean "example" --example

# Clean and overwrite original file

bad-word-cli file ./input.txt -r

# 🔁 File rewritten: /full/path/input.txt

# Clean and save to a new file

bad-word-cli file ./input.txt -n cleaned.txt

# 📄 Cleaned file saved as: /full/path/cleaned.txt

# Print cleaned content to console (no options)

bad-word-cli file ./input.txt

# Show usage example

bad-word-cli file ./input.txt --example

## 🧪 Bonus: Show Examples with --example

All commands support --example to show a real use case:

bad-word-cli clean "text here" --example
bad-word-cli file ./sample.txt --example
bad-word-cli isProf "word" --example
