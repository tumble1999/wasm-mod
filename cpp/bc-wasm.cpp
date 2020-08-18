#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void helloWorld() {
    printf("Hello from C++\n");
}