file_name = "./unigram_freq.csv"
new_words_count = 1000
new_file_name = f"./english{new_words_count}.txt"

cutoff_words = []

with open(file_name, "r", encoding="utf-8") as main_file:
    main_file.readline()
    i = 0
    while i < new_words_count:
        line = main_file.readline()
        word, count = line.split(",")
        if len(word) <= 3: continue
        cutoff_words.append(word)
        i += 1

    print(cutoff_words)

with open(new_file_name, "w", encoding="utf-8") as new_file:
    new_file.write("\n".join(cutoff_words))