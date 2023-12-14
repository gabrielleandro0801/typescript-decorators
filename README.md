# typescript-decorators

Example of Decorators in Typescript.

## Constructor Decorator
In this case, the constructor is wrapped by a decorator. The decorator will validate the args passed. If everything is ok, the instance will be created. Otherwise, an instance will be thrown.
 
## Function Decorator (V1)
In this case, the function is wrapped by a decorator. The decorator will validate if the email is already registered.
If everything is ok, the function will be called. Otherwise, the decorator itself will return null.

## Function Decorator (V2)
In this case, the function is wrapped by a decorator. The decorator will validate the args passed.
If everything is ok, the function will be called. Otherwise, the decorator itself will return.
