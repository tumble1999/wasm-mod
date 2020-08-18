#include <stdio.h>
#include <emscripten.h>

#ifdef __cplusplus
extern "C" {
#endif
EMSCRIPTEN_KEEPALIVE
void helloWorld() {
    printf("Hello from C++\n");
}
#ifdef __cplusplus
}
#endif