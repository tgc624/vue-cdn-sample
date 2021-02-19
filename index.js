const SamplePage = () =>
  Vue.component("sample-page", {
    created: function () {
      console.log("page created!");
    },
    data: () => ({
      wikipediaPageName: "",
      wikipediaPageDocument: undefined,
    }),
    computed: {},
    methods: {
      search: async function () {
        const apiBase = "https://ja.wikipedia.org/w/api.php";
        const params = [
          ["origin", "*"],
          ["format", "json"], //`https://${document.location.hostname}`],
          ["action", "parse"],
          ["page", encodeURIComponent(this.wikipediaPageName)],
          ["prop", "text"],
          ["formatversion", 2],
        ];
        const paramsStr = params.map((param) => param.join("=")).join("&");
        const textDocument = (await axios.get(`${apiBase}?${paramsStr}`)).data
          .parse?.text;
        this.wikipediaPageDocument = textDocument;
        //document.write(textDocument);
        console.log(textDocument);
      },
    },
    template: `
      <div>
        <fieldset>
          <legend>Wikipedia page name</legend>
          <input type="text" v-model="wikipediaPageName" placeholder="Page name">
          <button :disabled="!wikipediaPageName" @click="search">Confirm</button>
        </fieldset>
        <div v-html="wikipediaPageDocument"></div>
      </div>
    `,
  });

document.write(`
  <div id="app">
    <sample-page></sample-page>
  </div>
  <script id="vue-cdn" src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css">
  <script>
    (${SamplePage.toString()})();
    new Vue({ el: "#app" });
  </script>
`);
