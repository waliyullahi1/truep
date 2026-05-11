<script setup>
const policy = [
  {
    title: null,
    content: [
      { type: 'meta', text: 'Last updated: March 2026' },
      {
        type: 'p',
        text: 'This Privacy Policy explains how Abanise ("we", "us", or "our") collects, uses, and protects your personal data when you use abanise.com and related services, including property listings, searches, alerts, and communication features.'
      }
    ]
  },

  {
    title: '1. Data Controller',
    content: [
      { type: 'p', text: 'Abanise is responsible for processing your personal data.' },
      { type: 'p', text: 'Company: Abanise' },
      { type: 'p', text: 'Website: abanise.com' },
      {
        type: 'link',
        text: 'Email: support@abanise.com',
        href: 'mailto:support@abanise.com'
      }
    ]
  },

  {
    title: '2. What Data We Collect',
    content: [
      {
        type: 'p',
        text: 'Depending on how you use our platform, we may collect the following types of data:'
      },
      {
        type: 'list',
        items: [
          'Name, email address, and account details',
          'Property listing information (images, descriptions, location)',
          'Search preferences and alerts',
          'Device and browser information',
          'Usage data and interaction with the platform'
        ]
      }
    ]
  },

  {
    title: '3. How We Use Your Data',
    content: [
      {
        type: 'list',
        items: [
          'To create and manage your account',
          'To display and promote property listings',
          'To send property alerts and notifications',
          'To improve our platform and user experience',
          'To communicate with you about updates or support'
        ]
      }
    ]
  },

  {
    title: '4. Payments',
    content: [
      {
        type: 'p',
        text: 'If you make payments on Abanise, your payment details are processed securely by trusted third-party payment providers. We do not store sensitive payment information directly.'
      }
    ]
  },

  {
    title: '5. Cookies and Tracking',
    content: [
      {
        type: 'p',
        text: 'We use cookies and similar technologies to improve your experience, analyze usage, and personalize content.'
      },
      {
        type: 'p',
        text: 'You can control or disable cookies through your browser settings.'
      }
    ]
  },

  {
    title: '6. Data Sharing',
    content: [
      {
        type: 'p',
        text: 'We may share your data with:'
      },
      {
        type: 'list',
        items: [
          'Hosting and cloud service providers',
          'Analytics and marketing tools',
          'Payment processors',
          'Authorities when required by law'
        ]
      },
      {
        type: 'p',
        text: 'We do not sell your personal data.'
      }
    ]
  },

  {
    title: '7. Data Retention',
    content: [
      {
        type: 'list',
        items: [
          'Account data is stored while your account is active',
          'Some data may be retained for legal or security purposes',
          'You may request deletion of your data at any time'
        ]
      }
    ]
  },

  {
    title: '8. Security',
    content: [
      {
        type: 'p',
        text: 'We implement security measures such as encryption, access control, and monitoring to protect your data from unauthorized access or misuse.'
      }
    ]
  },

  {
    title: '9. Your Rights',
    content: [
      {
        type: 'p',
        text: 'You have the right to:'
      },
      {
        type: 'list',
        items: [
          'Access your personal data',
          'Correct inaccurate information',
          'Request deletion of your data',
          'Object to certain processing',
          'Withdraw consent at any time'
        ]
      },
      {
        type: 'p',
        text: 'To exercise your rights, contact us at support@abanise.com.'
      }
    ]
  },

  {
    title: '10. Changes to This Policy',
    content: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy from time to time. Continued use of Abanise means you accept any updates.'
      }
    ]
  },

  {
    title: '11. Contact',
    content: [
      { type: 'p', text: 'Abanise' },
      { type: 'p', text: 'Website: abanise.com' },
      {
        type: 'link',
        text: 'Contact Support',
        href: 'mailto:support@abanise.com'
      }
    ]
  }
]
</script>

<template>
  <section class="px-6 lg:px-16 my-6">
    <NavigationBackArrow/>
    <div class="mx-auto max-w-container">
      
      <h1 class="text-2xl font-bold mb-6">
        Privacy Policy
      </h1>

      <div class="space-y-8">

        <div
          v-for="(section, index) in policy"
          :key="index"
          class="space-y-4"
        >
          
          <!-- Title -->
          <h2
            v-if="section.title"
            class="text-xl font-medium"
          >
            {{ section.title }}
          </h2>

          <!-- Content -->
          <div class="space-y-2">
            
            <template v-for="(item, i) in section.content" :key="i">

              <!-- Paragraph -->
              <p v-if="item.type === 'p'" class="text-sm">
                {{ item.text }}
              </p>

              <!-- Meta -->
              <p v-if="item.type === 'meta'" class="text-sm font-bold">
                {{ item.text }}
              </p>

              <!-- List -->
              <ul
                v-if="item.type === 'list'"
                class="list-disc ps-6 space-y-1 text-sm"
              >
                <li v-for="(li, j) in item.items" :key="j">
                  {{ li }}
                </li>
              </ul>

              <!-- Link -->
              <p v-if="item.type === 'link'" class="text-sm">
                <a
                  :href="item.href"
                  target="_blank"
                  class="text-blue-500 underline"
                >
                  {{ item.text }}
                </a>
              </p>

            </template>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>