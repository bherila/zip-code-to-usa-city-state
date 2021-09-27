# zip-code-to-usa-city-state

It's a map of ZIP codes (ZIP is a trademark of USPS) to city/state.

Use like this:

```typescript
import zip from 'zip-code-to-usa-city-state'

console.log(zip['12345'])
// { city: 'NY', state: 'Schenectady' }
```

Try it

```bash
node test.js
```

Data source is from GeoNames and used here with attribution in accordance with license instructions at 
* http://www.geonames.org/about.html
* https://download.geonames.org/export/zip/

The underlying source datafile is here as US.txt
