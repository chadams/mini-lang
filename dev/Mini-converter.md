one line excel file

```
jq -c . config.json
```

convert to json

```
npx convert-excel-to-json --config='{"sourceFile": "Mini.xlsx"}' >> Mini.json
```

with extracted keys

```
npx convert-excel-to-json --config='{"sourceFile":"Mini.xlsx","sheets":[{"name":"Omniglot","header":{"rows":3},"columnToKey":{"A":"tra","C":"txt"}},{"name":"Mini Kore","header":{"rows":3},"columnToKey":{"A":"txt","B":"tra","C":"tra2","D":"tra3"}},{"name":"Mini Mundo","header":{"rows":4},"columnToKey":{"A":"txt","B":"tra"}}]}' >> Mini.json
```

convert to word list

```
cat Mini.json | jq '[."Mini Mundo"[] | {key:.txt, value:.tra}]' | jq 'from_entries' >> words-mini-mundo.json
```
