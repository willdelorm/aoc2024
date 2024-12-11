# Advent of Code 2024

## Introduction

Happy December! For this year's [Advent of Code](https://adventofcode.com/), I will be writing reflections on my experience each day.

## Entries

### Day 1: Historian Hysteria

These challenges force me to refresh myself on simple concepts like reading files and regular expressions. I remember having a lot of trouble getting Node to read the files when I participated in my first AoC.

Preparing the data for today's challenges was simple enough. I created an array of all the numbers, then traversed that array and pushed each number into two lists based on index. Lastly, I sorted the lists from smallest to largest.

Calculating the distances was relatively simple, but a good first day challenge. The example data didn't specify whether the right number would always be larger than the left. To be safe, I calculated the absolute value of the difference.

For part 2, I wanted to avoid a potential O(n^2) algorithm. Traversing the left list and counting frequency of the right list on each iteration would be very inefficient. So I created an object with the unique values as the key and the number of appearances in the second list as the value. I then traversed the first list, checked the object for its multiplier value and added it to the total score.

My output was returning NaN on my first run. I forgot that if the ID didn't appear in the right list, it wouldn't have a value to return. The answer for this was to create a ternary operator to return 0 if the key didn't exist.

Ta da! Day 1 in the books. I think this is the first time I'm starting on time. Looking forward to keeping up with this!

### Day 2: Red-Nosed Reports

I initially got too granular with reading the data and spun myself in circles. On day 3, I ended up looking at another user's submission in Python which gave me direction to solving it in JavaScript.

Looping through each line of data, I created a new array of the difference between adjacent values and counted how many of those differences were positive and negative. These counts showed whether the differences were predominantly positive or negative. As long as one of the conditions were true, I checked that the smallest and largest differences fit within the range 1-3, inclusive. If the report fit, I incremented the number of safe reports.

For part 2, I first checked to see if the report was safe without using a dampener. If not, I looped thru the report, removing one value at a time to see if it would be safe without that value.

While the solution wasn't solely my own, I learned quite a lot, including determining whether a set of values is predominantly positive or negative. Rather than wrecking my brain over challenges I struggle on, I am choosing to learn from others.

### Day 3: Mull It Over

After yesterday's crisis of faith, I had a much smoother experience working on today's puzzle. Finding valid segments within a larger string sent my regular expression alarms blaring! I had to look up a cheat sheet (does anyone not?) for a few pieces, such as quantifying a range for the number lengths. Although the author didn't say there would be larger numbers, it was still a safe bet to check.

After looking at other submissions for Day 1, I learned a neat shortcut to turn string-typed numbers into Numbers, array.map(Number) which greatly simplified my conversions.

Another discovery was the method imul() from the Math package. Using this, I was able to use the spread operator to pass the digits to multiply which looks neater in my mind.

Part 2 came easily enough to me. I extended my initial regex to include the do() and don't() instructions, and added a Boolean variable to track whether instruction reading was enabled.

I got a little regex-happy to check what kind of instruction each entry was, using the ? quantifier to make sure I grabbed "don't" instead of just "don" with my initial type checker. A switch statement seemed perfect for this situation to toggle the Boolean or try executing the mul() instruction.

I gotta say, half the time I use switch statements, I don't have a real default action. I plopped in a silly "error" statement just in case.

Glad to see day 2 wasn't a sign of the speed with which the problems would increase in difficulty. Looking forward to what challenges await tomorrow!

### Day 4: Ceres Search

Grids make their return to AoC! I enjoyed setting up the abilities to read this 2-dimensional input data. This year, I found the dimensions of the grid, then joined it all into a single line of "tape" to make iterating thru the data more efficient.

In part 1, I traversed the input and saved the locations for every instance of the letter X. Once I had that, I took each instance and searched for instances of "XMAS" by checking each adjacent space. Achieving this involved a bit of recursion which, to my surprise, came pretty quickly to me! Only when it reached the final letter "S" was that instance considered a success and added to the count.

I struggled to solve part 2 for a while due to thinking that I _must_ use some of part 1 to do it. When I took a step back, I realized I could forego recursion and answer this challenge more simply. This time, I found all the instances of "A", got the values from each corner where valid (ignoring out of bounds positions) and checked them against the 4 valid options. I deserved a forehead smack when this answer finally came to me!

### Day 11: Plutonian Pebbles

Memoization to the rescue! After reading today's challenge, I brainstormed a few ways to tackle the solution. Nesting for loops this way and that would work, but became exponentially challenging to result in an answer on Part 2.

Recursion seemed like the right answer because it would reduce the amount of memory being used at one time. With each starting value, the program would drill down until it ran out of blinks, then return the total number of stones within each branch. This worked fine for part 1 because the number of blinks was relatively few, so my computer was able to handle the number of computations.

When I threw part 2's whopping 75 blinks at my program, my computer's fans went into overdrive as it tried to calculate the exponentially-larger number of computations. After 10 minutes, I killed the program and considered what to do. I was certain my logic so far was sound, so I had to add something here. Then it dawned on me that there was likely many calculations that repeat throughout the run. If I could save these values the first time, it would drastically reduce how much work my program would have to do.

I had to look up memoization to refresh myself on how to structure it. Once I had done that, I was able to plug it into my recursive function and WOW! I expected it to run faster, but part 2 went from a potentially-infinite run time to a measly 153ms! Even part 1 improved by roughly 80%. I'll have to keep that trusty memo around for the rest of the month, it's sure to come in handy!
