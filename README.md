# Vending Machine

```
this is a cli system that sell Coffee and Coca.

1) ask you to insert you coin and check if your coin is valid .
2) ask you your product , coca or coffee .
3) check your product with coin and compare price .
4) if they were compatible choose a machine that is not busy
5) machine will work for some minute and then give your product
```
# Note 
> becuase of some delaye time that making your product take , machine going to ask you to put another coin for your next order but as soon as your previous order getting ready , machine will print that for you. i used setTimeOut to simulation taking time to making coffee or coca . and in each time i will show you wich machines are not busy

# Run Project In Docker Mode

> npm run docker

# Run Project In Pure Node

> npm start

# Run Tests

> npm run test

# Bugs 
> if all machines were busy , our thread will block and app will crash . we should getting orders in sequence and save them as queue and process them in order , but for keeping project simple i didnt do that , so dont make more than 6 order instantly , i set my setTimeOut on 10 second for each order 