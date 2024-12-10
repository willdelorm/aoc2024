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

### Day 2: Red-Nosed Reports

So I suuuuper overthought this challenge and only completed it on day 3 after I peeked at another user's solution in a different language. While I am bummed I didn't figure it out myself, I am pleased with how I adapted the thinking to JavaScript.

My initial idea for this challenge involved trying to squeeze as much information from adjacent elements before moving on to the next pair. With only part of the info, I was really struggling to see the big picture (and the big answer). I think I was attempting to answer each line in O(n) instead of O(2-3n). Anyway, big mess. That code was ugly as sin, and only got worse in part 2 when I was trying to track a dampener being spent and reusing a lot of code. Not DRY at all.

### Day 3: Mull It Over

After yesterday's crisis of faith, I had a much smoother experience working on today's puzzle. Finding valid segments within a larger string sent my regular expression alarms blaring! I had to look up a cheat sheet (does anyone not?) for a few pieces, such as quantifying a range for the number lengths. Although the author didn't say there would be larger numbers, it was still a safe bet to check.

After looking at other submissions for Day 1, I learned a neat shortcut to turn string-typed numbers into Numbers, array.map(Number) which greatly simplified my conversions.

Another discovery was the method imul() from the Math package. Using this, I was able to use the spread operator to pass the digits to multiply which looks neater in my mind.

Part 2 came easily enough to me. I extended my initial regex to include the do() and don't() instructions, and added a Boolean variable to track whether instruction reading was enabled.

I got a little regex-happy to check what kind of instruction each entry was, using the ? quantifier to make sure I grabbed "don't" instead of just "don" with my initial type checker. A switch statement seemed perfect for this situation to toggle the Boolean or try executing the mul() instruction.

I gotta say, half the time I use switch statements, I don't have a real default action. I plopped in a silly "error" statement just in case.

Glad to see day 2 wasn't a sign of the speed with which the problems would increase in difficulty. Looking forward to what challenges await tomorrow!
