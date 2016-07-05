export default [
  {
    tab: 1,
    position: 'top',
    title: 'Welcome to RestCoder',
    text: `
Welcome to your first challenge!<br/>
The <strong>Overview</strong> section describes the problem to solve.<br/>
Please read it carefully!`,
    selector: '#overview'
  },
  {
    tab: 1,
    position: 'top',
    title: 'Sample solution',
    text: `We provide a complete solution for every <strong>Starter</strong> challenge.<br/>
You can check it here.`,
    selector: '#solution-link'
  },
  {
    tab: 1,
    position: 'top',
    title: 'Notes',
    text: `Keep in mind all <strong>notes</strong>!<br/>
All problems contain the <code>READY</code> requirement.<br/> Sometimes there can be more information.
`,
    selector: '#notes'
  },
  {
    tab: 1,
    position: 'top',
    title: 'Environmental Variables',
    text: `Your application must get all configuration from the environmental variables.<br/>
This section contains all required variables that your app must use.<br/>
<strong>Never hard-code any settings!</strong>
`,
    selector: '#env-variables'
  },
  {
    tab: 2,
    position: 'top',
    title: 'Setup',
    text: `Check here deployment instructions for either local or c9 development.`,
    selector: '#setup-tab'
  },
  {
    tab: 3,
    position: 'top',
    title: 'Endpoints',
    text: `The <strong>Endpoints</strong> tab contains all required endpoints that your application must implement.`,
    selector: '#endpoints-tab'
  },
  {
    tab: 3,
    position: 'top',
    title: 'Endpoints',
    text: `This is an endpoint definition.<br/> The <code>Schema</code> describes a required response format.<br/>
In this endpoint you must return a plain text.`,
    selector: '#endpoints .operations'
  },
  {
    tab: 3,
    position: 'top',
    title: 'Endpoints',
    text: `In RestCoder almost all responses will be in the JSON format. Always check the <code>Schema</code> carefully.<br/>
Your application should return exactly the same format.<br/>
Don't include any additional properties.`,
    selector: '#endpoints .operations:nth-child(2) .json-schema-view'
  },
  {
    tab: 4,
    position: 'top',
    title: 'Examples',
    text: `The <strong>Examples</strong> tab contains sample requests and responses. <br/> Your API should produce the same result.`,
    selector: '#examples-tab'
  },
  {
    tab: 4,
    position: 'top',
    title: 'Endpoints',
    text: `This is an example HTTP request.<br/> It contains all information about the request and response.
<br/>Always check the response headers if available.`,
    selector: '#challengeTabs-pane-4 .example'
  },
  {
    tab: 4,
    position: 'top',
    title: 'Endpoints',
    text: `Click this button to quickly import all examples to Postman.`,
    selector: '#postman-btn'
  },
  {
    tab: 1,
    position: 'top',
    title: 'Step by step solution',
    text: `Here you can check a detailed step by step guide.`,
    selector: '#solution-tab'
  },
  {
    position: 'top',
    title: 'Problems?',
    text: `If you have any questions ask it on forum.<br/> Good luck!`,
    selector: '#discuss-tab'
  },
];
