# def HakimFun(func):
#     def inner(var):
#        print("Iam decorator",10)
#        func(5)
#     return inner
#
#
# def printting(var):
#     print("hi I am function",var)
#
# main=HakimFun(printting)
# main(10)



def test(*c,**k):
    for i in c:
        print(i)
    for i in k:
        print(i,"=",k[i])

test("hi","from","hakim")