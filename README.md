# Advent of Code 2024

## Introduction

Happy December! For this year's [Advent of Code](https://adventofcode.com/), I will be writing reflections on my experience each day.

## Entries

### Day 1: Historian Hysteria

These challenges force me to refresh myself on simple concepts like reading files and regular expressions. I remember having a lot of trouble getting Node to read the files when I participated in my first AoC. What a relief it was to set up that process quickly this time around.

My initial thought on creating the two lists required traversing the initial data twice (silly me). I quickly pivoted to traversing the location IDs once and pushing to the correct array based on index.

Calculating the distances was relatively simple, but a good first day challenge. Sorting the lists and finding the difference was straight-forward. I don't think the example data made it clear whether the right-list value could be smaller OR larger than the left-list value. Just in case, I calculated the absolute value of the difference.

Part 2 could become an efficiency nightmare. Again, my initial plan was to traverse the left list and count frequency of the right list on each loop. Red flags immediately popped up in my head because that concept would have a time efficiency of O(n^2), a big no no in programming.

Instead of an egregious amount of looping, my final solution only loops twice. The first loop created an object with the location ID as the key and the number of appearances as the value. The second loop traverses the left list, checks the object for its multiplier value and adds it to the total score.

My output was returning NaN. I rushed my part 2 solution and so wasn't checking my code as I went along (like I did for part 1). I forgot that if the ID didn't appear in the right list, it wouldn't have a value to return. The quick fix was to create a ternary operator to return 0 if the location key didn't exist.

Ta da! Day 1 in the books. I think this is the first time I'm starting on time. Looking forward to keeping up with this!
