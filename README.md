# **Idler**

1.  `npm install`
2.  `npm run serve`
3.  add JSON to `./json` with format `${method}_${path}.json` The file's contents will be idler's response

# Other stuff to know:

- editing/adding/saving a file in the `./json` dir will automagically register it with the server and the updated contents will be available to clients
- you can view current responses in a UI format at `http://localhost:${port}/`
- you can view raw JSON for all responses at `http://localhost:${port}/get`
