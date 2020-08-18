// UserScript Exports
var globals = {Module}
for (const g in globals) {exportFunction(globals[g],unsafeWindow,{defineAs: g});}