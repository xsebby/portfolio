/* CS 211 Recitation 05: a separate program for practicing GCC and GDB. */
int transform(int x) {
    return 3 * x + 2;
}

int main(void) {
    int result = transform(4);
    return result == 14 ? 0 : 1;
}
