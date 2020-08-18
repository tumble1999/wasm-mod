#include <stdio.h>
#include <emscripten/emscripten.h>


void EMSCRIPTEN_KEEPALIVE helloWorld() {
    printf("Hello from C++\n");
}