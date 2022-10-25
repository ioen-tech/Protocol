import mock from '@/@fake-db/mock'
import macPc from '@/assets/images/pages/mac-pc.png'
import poseF28 from '@/assets/images/pages/pose-f-28.png'
import poseF3 from '@/assets/images/pages/pose-f-3.png'
import poseM39 from '@/assets/images/pages/pose-f-39.png'
import poseM14 from '@/assets/images/pages/pose-m-14.png'
import poseM34 from '@/assets/images/pages/pose-m-34.png'
import poseM5 from '@/assets/images/pages/pose-m-5.png'
const database = {
  knowledgeBaseCategories: [
    {
      character: poseF3,
      category: 'sales-automation',
      title: 'Sales Automation 👩🏻‍💻',
      desc: 'There is perhaps no better demonstration of the folly of image of our tiny world.',
    },
    {
      character: poseF28,
      category: 'marketing-automation',
      title: 'Marketing Automation 🚀',
      desc: 'Look again at that dot. That\'s here. That’s home. That\'s us. On it everyone you love.',
    },
    {
      character: poseM34,
      category: 'api-questions',
      title: 'API Questions 📱',
      desc: 'Every hero and coward, every creator and destroyer of civilization.',
    },
    {
      character: poseM39,
      category: 'email-marketing',
      title: 'Email Marketing ✉️',
      desc: 'There is perhaps no better demonstration of the folly of human conceits.',
    },
    {
      character: poseM14,
      category: 'personalization',
      title: 'Personalization 🤩',
      desc: 'It has been said that astronomy is a humbling and character experience.',
    },
    {
      character: poseM5,
      category: 'demand-generation',
      title: 'Demand Generation 🤟🏻',
      desc: 'Competent means we will never take anything for granted.',
    },
  ],
  knowledgeBaseSubcategories: [
    {
      icon: 'mdi-cog-outline',
      iconColor: 'primary',
      title: 'Account Settings',
      questions: [
        {
          slug: 'how-secure-is-my-password',
          question: 'How Secure Is My Password?',
        },
        {
          slug: 'can-i-change-my-username',
          question: 'Can I Change My Username?',
        },
        {
          slug: 'where-can-i-upload-my-avatar',
          question: 'Where Can I Upload My Avatar?',
        },
        {
          slug: 'how-do-i-change-my-timezone',
          question: 'How Do I Change My Timezone?',
        },
        {
          slug: 'how-do-i-change-my-password',
          question: 'How Do I Change My Password?',
        },
      ],
    },
    {
      icon: 'mdi-link',
      iconColor: 'success',
      title: 'API Questions',
      questions: [
        {
          slug: 'what-technologies-are-used',
          question: 'What Technologies Are Used?',
        },
        {
          slug: 'what-are-the-api-limits',
          question: 'What Are The API Limits?',
        },
        {
          slug: 'why-was-my-application-rejected',
          question: 'Why Was My Application Rejected?',
        },
        {
          slug: 'where-can-i-find-the-documentation',
          question: 'Where can I find the documentation?',
        },
        {
          slug: 'how-do-i-get-an-api-key',
          question: 'How Do I Get An API Key?',
        },
      ],
    },
    {
      title: 'Billing',
      iconColor: 'error',
      icon: 'mdi-currency-usd',
      questions: [
        {
          slug: 'can-i-contact-a-salés-rep',
          question: 'Can I Contact A Salés Rep?',
        },
        {
          slug: 'do-i-need-to-pay-vat',
          question: 'Do I Need To Pay VAT?',
        },
        {
          slug: 'can-i-get-a-refund',
          question: 'Can I Get A Refund?',
        },
        {
          slug: 'difference-annual-&-monthly-billing',
          question: 'Difference Annual & Monthly Billing',
        },
        {
          slug: 'what-happens-if-the-price-increases',
          question: 'What Happens If The Price Increases?',
        },
      ],
    },
    {
      iconColor: 'warning',
      icon: 'mdi-lock-open-outline',
      title: 'Copyright & Legal',
      questions: [
        {
          slug: 'how-do-i-contact-legal',
          question: 'How Do I Contact Legal?',
        },
        {
          slug: 'where-are-your-offices-located',
          question: 'Where Are Your Offices Located?',
        },
        {
          slug: 'who-owns-the-copyright-on-text',
          question: 'Who Owns The Copyright On Text?',
        },
        {
          slug: 'our-content-policy',
          question: 'Our Content Policy',
        },
        {
          slug: 'how-do-i-file-a-dmca',
          question: 'How Do I File A DMCA?',
        },
      ],
    },
    {
      icon: 'mdi-cellphone-cog',
      iconColor: 'info',
      title: 'Mobile Apps',
      questions: [
        {
          slug: 'how-do-i-download-the-android-app',
          question: 'How Do I Download The Android App?',
        },
        {
          slug: 'how-to-download-our-iPad-app',
          question: 'How To Download Our iPad App',
        },
        {
          slug: 'where-can-i-upload-my-avatar',
          question: 'Where Can I Upload My Avatar?',
        },
        {
          slug: 'can-i-use-my-android-phone',
          question: 'Can I Use My Android Phone?',
        },
        {
          slug: 'is-there-an-iOS-app',
          question: 'Is There An iOS App?',
        },
      ],
    },
    {
      title: 'Using KnowHow',
      icon: 'mdi-information-outline',
      questions: [
        {
          slug: 'customization',
          question: 'Customization',
        },
        {
          slug: 'upgrading',
          question: 'Upgrading',
        },
        {
          slug: 'customizing-your-theme',
          question: 'Customizing Your Theme',
        },
        {
          slug: 'upgrading-your-theme',
          question: 'Upgrading Your Theme',
        },
      ],
    },
  ],
  KnowledgeBaseQuestionsAndAnswers: [
    {
      postImg: macPc,
      postContent: {
        title: 'Why Was My Developer Application Rejected?',
        postDesc: `<p>Last updated on 10 Dec 2018</p><p>Pie chupa chups I love I love pastry lemon drops cake pudding I love. Candy I love topping muffin muffin sweet roll caramels marshmallow gummi bears. Jelly cupcake sweet cake powder pudding lemon drops carrot cake. I love chocolate bar chupa chups gummies carrot cake. Lollipop liquorice marzipan liquorice lemon drops tart chocolate bar. Shortbread marzipan tiramisu I love powder.</p>
<p><strong>Shortbread jelly apple pie pastry</strong></p>
<p>Sweet pudding pastry I love icing. Gingerbread ice cream gummi bears shortbread I love I love. Cookie I love chocolate cake cake dragée cotton candy jelly-o gummies donut.</p>
<p>Powder jelly macaroon jelly I love lemon drops. Brownie fruitcake cheesecake tootsie roll I love I love cake brownie candy canes. Bonbon chocolate jelly-o chupa chups I love muffin pie lemon drops pudding.</p>
<p><strong>Carrot cake gummies cookie</strong></p>
<p>Topping macaroon lollipop I love I love. Halvah chocolate dragée sweet roll sesame snaps biscuit ice cream cheesecake halvah.</p>
<ol>
<li>1. Chocolate Bourbon Pecan Pie Cupcakes</li>
<li>2. Easy Little Pandas</li>
<li>3. Apple Pie Cupcakes</li>
</ol>
<br />
<p class="mb-0">Bear claw chocolate bar lollipop chupa chups icing tiramisu. Jujubes cotton candy icing chocolate cotton candy. Danish chocolate carrot cake chocolate cake I love sugar plum. Liquorice dessert topping bear claw sesame snaps.</p>
`,
      },
      relatedQuestions: [
        { question: 'How Secure Is My Password?', slug: 'how-secure-is-my-password' },
        { question: 'Can I Change My Username?', slug: 'can-i-change-my-username' },
        { question: 'Where Can I Upload My Avatar?', slug: 'where-can-i-upload-my-avatar' },
        { question: 'How Do I Change My Timezone?', slug: 'how-do-i-change-my-timezone' },
        { question: 'How Do I Change My Password?', slug: 'how-do-i-change-my-password' },
      ],
    },
  ],
}
mock.onGet('/pages/knowledge-base/categories').reply(config => {
  const { q = '' } = config.params ?? ''
  let filterData = [...database.knowledgeBaseCategories]
  if (q) {
    const knowledgeBaseSearchQueryLower = q.toLowerCase()
    filterData = database.knowledgeBaseCategories.filter(kb => kb.title.toLowerCase().includes(knowledgeBaseSearchQueryLower) || kb.desc.toLowerCase().includes(knowledgeBaseSearchQueryLower))
  }
  
  return [200, filterData]
})
mock.onGet(/\/pages\/knowledge-base\/categories\/questions\/[\w-]+/).reply(() => {
  return [200, database.KnowledgeBaseQuestionsAndAnswers[0]]
})
mock.onGet(/\/pages\/knowledge-base\/categories\/[\w-]+/).reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()
  const filteredData = []
  Object.entries(database.knowledgeBaseSubcategories).forEach(entry => {
    const categoryObj = entry[1]
    const filteredQAndA = categoryObj.questions.filter(obj => {
      return obj.question.toLowerCase().includes(queryLowered)
    })
    if (filteredQAndA.length)
      filteredData.push({ ...categoryObj, questions: filteredQAndA })
  })
  
  return [200, filteredData]
})
