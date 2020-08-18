// UserScript Exports
var globals = {}
for (const g in globals) {exportFunction(globals[g],unsafeWindow,{defineAs: g});}