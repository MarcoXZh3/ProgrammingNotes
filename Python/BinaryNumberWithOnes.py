'''
Created on May 1, 2015
@author: MarcoXZh
'''


def func(bits, numbers, prev):
    '''
    Put 'numbers' of 1s in to a binary length of 'bits',
    then append the string form of it to 'prev'
    @param bits:      {Integer} number of digits
    @param numbers:   {Integer} number of 1s
    @param prev:      {String} previous results
    '''
    # Put only one 1 into the binary
    # -- this is the last step,
    #    so once appended to 'prev', print it out immediately
    global count
    if numbers <= 0:
        count += 1
        print '0' * bits, count
    elif numbers == 1:
        for i in range(bits):
            s = list('0' * bits)
            s[i] = '1'
            count += 1
            print prev + ''.join(s), count
        pass # for i in range(bits)
    else:
        # To put 'numbers' of 1s into binary length of 'bits',
        # the leftmost 1 has 'bits - numbers' choices
        for i in range(bits - numbers + 1):
            # Once the leftmost 1' position is determined,
            # put the remaining 'numbers - 1' 1s into the remaining bits of the binary
            func(bits - 1 - i, numbers - 1, prev + (('0' * i) + '1'))
    pass # else - if numbers == 1
pass # def func(bits, numbers, prev)


if __name__ == '__main__':
    # Put 'numbers' of 1s into a binary number length of 'bits';
    # Previous result is an empty string
    count = 0
    bits =  8
    for i in range(bits + 1):
        func(bits, i, '')
pass # if __name__ == '__main__'
