<script setup>
const terms = [
  {
    title: null,
    content: [
      { type: 'meta', text: 'Last updated: March 2026' },
      { type: 'meta', text: 'Version: 1.0' },
      { type: 'meta', text: 'Website: abanise.com' },
      { type: 'meta', text: 'Company: Abanise' },
      {
        type: 'p',
        text: 'These Terms and Conditions ("Terms") govern your use of abanise.com and all related services provided by Abanise ("we", "us", or "our"). By accessing the platform, creating an account, or using any of our services, you agree to comply with these Terms.'
      }
    ]
  },

  {
    title: '1. Overview',
    content: [
      {
        type: 'p',
        text: 'These Terms represent the full agreement between you and Abanise regarding your use of our platform.'
      },
      {
        type: 'p',
        text: 'Nothing in these Terms affects any rights granted to you under applicable laws.'
      }
    ]
  },

  {
    title: '2. Our Services',
    content: [
      {
        type: 'p',
        text: 'Abanise provides a platform that helps users discover, buy, rent, and manage property listings in a simple and efficient way.'
      },
      {
        type: 'p',
        text: 'We may improve, modify, or discontinue parts of the platform at any time to enhance performance, security, or user experience.'
      }
    ]
  },

  {
    title: '3. User Responsibilities',
    content: [
      {
        type: 'p',
        text: 'By using Abanise, you confirm that you are legally allowed to use our services and that all information you provide is accurate.'
      },
      {
        type: 'list',
        items: [
          'Provide truthful and up-to-date information',
          'Respect other users and their data',
          'Avoid posting false or misleading property listings',
          'Do not attempt to hack, disrupt, or misuse the platform',
          'Do not use automated tools (bots, scrapers) without permission'
        ]
      },
      {
        type: 'p',
        text: 'Failure to follow these rules may result in account suspension or permanent removal.'
      }
    ]
  },

  {
    title: '4. Listings and Content',
    content: [
      {
        type: 'p',
        text: 'Users may upload property listings, images, and other content. You are responsible for ensuring that your content is accurate and lawful.'
      },
      {
        type: 'p',
        text: 'By posting content, you grant Abanise permission to display and promote it as part of the platform.'
      },
      {
        type: 'p',
        text: 'We reserve the right to remove any content that is misleading, illegal, or violates these Terms.'
      }
    ]
  },

  {
    title: '5. Payments and Transactions',
    content: [
      {
        type: 'p',
        text: 'Certain features on Abanise may require payment. All fees will be clearly displayed before you complete a transaction.'
      },
      {
        type: 'p',
        text: 'Payments are processed securely, and you agree to provide valid payment details when required.'
      },
      {
        type: 'p',
        text: 'Unless otherwise stated, payments are non-refundable once the service has been delivered.'
      }
    ]
  },

  {
    title: '6. Platform Availability',
    content: [
      {
        type: 'p',
        text: 'We aim to keep Abanise available at all times, but we do not guarantee uninterrupted access.'
      },
      {
        type: 'p',
        text: 'We are not responsible for temporary downtime due to maintenance, updates, or technical issues.'
      }
    ]
  },

  {
    title: '7. Limitation of Liability',
    content: [
      {
        type: 'p',
        text: 'Abanise acts as a platform connecting users and property listings. We do not own or directly manage the listed properties.'
      },
      {
        type: 'p',
        text: 'We are not responsible for any disputes, damages, or losses resulting from interactions between users.'
      }
    ]
  },

  {
    title: '8. Account Suspension',
    content: [
      {
        type: 'p',
        text: 'We reserve the right to suspend or terminate accounts that violate these Terms or misuse the platform.'
      }
    ]
  },

  {
    title: '9. Changes to Terms',
    content: [
      {
        type: 'p',
        text: 'We may update these Terms from time to time. Continued use of Abanise means you accept any updated version.'
      }
    ]
  },

  {
    title: '10. Contact',
    content: [
      { type: 'p', text: 'Abanise' },
      { type: 'p', text: 'Email: support@abanise.com' },
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
    <div class="mx-auto max-w-container">
      
      <h1 class="text-2xl font-bold mb-6">
        Terms and Conditions
      </h1>

      <div class="space-y-8">

        <div
          v-for="(section, index) in terms"
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
              <p
                v-if="item.type === 'p'"
                class="text-sm"
              >
                {{ item.text }}
              </p>

              <!-- Meta -->
              <p
                v-if="item.type === 'meta'"
                class="text-sm font-bold"
              >
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