<script setup>

defineProps({

  avatar:{
    type:String,
    default:"/image/profile.webp"
  },
  location:{
    type: String,
    default: "Waliu Waheed"
  },
  name:{
    type:String,
    default:"Waliu Waheed"
  },

  role:{
    type:String,
    default:"Property Agent"
  },

  phone:{
    type:String,
    default:"+234 800 000 0000"
  },

  website:{
    type:String,
    default:"abanise.com"
  },

  skills:{
    type:Array,
    default:()=>[
      "Sales",
      "Negotiation",
      "Marketing"
    ]
  }

})

</script>



<template>





<div
class="
relative
w-[800px] h-[1200px]
rounded-[55px]
overflow-hidden
shadow-[0_50px_100px_rgba(0,0,0,.35)]
bg-gradient-to-b
from-[#8bd3ff]
via-[#081d55]
to-[#020617]
"
>



<!-- BLUE LIGHT -->

<div
class="
absolute
-top-40
left-10
w-[450px]
h-[450px]
rounded-full
bg-blue-200/40
blur-[120px]
"
>
</div>




<!-- TOP WEBSITE -->

<div
class="
absolute
top-8
right-8
z-20
px-5
py-3
rounded-full
bg-white/10
backdrop-blur-2xl
border
border-white/20
"
>


<div
class="
flex
items-center
gap-2
text-white
"
>

<Icon
name="heroicons:globe-alt"
class="w-5 h-5"
/>


<span>

{{website}}

</span>


</div>


</div>







<!-- PROFILE IMAGE -->

<div
class="


w-full
 h-[700px]

overflow-hidden
border-[8px]
border-white/30
shadow-2xl
"
>


<img

:src="avatar"

class="
w-full
h-full
object-cover
"

/>


</div>

<div
class="


w-full
 h-[600px]
  opacity-20
overflow-hidden
border-[8px]
border-white/30
shadow-2xl
"
>


<img

:src="avatar"

class="
w-full
h-full
object-cover
"

/>


</div>








<!-- GLASS CONTENT -->

<div
class="
absolute
bottom-0
left-0
right-0
p-12
pt-24
rounded-t-[70px]
glass
"
>




<!-- NAME -->

<h1
class="
text-white
text-5xl
font-black
leading-none
tracking-tight
"
>

{{name}}

</h1>





<!-- ROLE -->

<div
class="
mt-1 flex items-center
text-white/70
text-2xl gap-7
"
>

{{role}}
<!-- VERIFIED -->

<div
class="

inline-flex
items-center
gap-3
px-5
py-3
rounded-full
bg-emerald-400/20
border
border-emerald-300/30
backdrop-blur-xl
"
>


<Icon

name="heroicons:check-badge"

class="
w-7
h-7
text-emerald-300
"

/>


<span
class="
text-white
font-medium
"
>

Verified Agent

</span>


</div>
</div>

<div v-if="location.state"  class=" flex mt-5  items-center jus text-2xl font-medium text-white">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>





<!-- VERIFIED -->










<!-- CONTACT -->

<div
class="
mt-5
 flex justify-between items-center
"
>



<div
class="
flex
items-center
gap-4
text-white
"
>


<Icon

name="heroicons:phone"

class="w-6 h-6"

/>


<span
class="text-xl"
>

{{phone}}

</span>


</div>







<div
class="
flex
items-center
gap-4
text-white
"
>


<Icon

name="heroicons:envelope"

class="w-6 h-6"

/>



<span
class="text-xl"
>

{{name.replace(/\s+/g,'').toLowerCase()}}@abanise.com

</span>


</div>



</div>









<!-- SKILLS -->

<div
class="
mt-8
flex
gap-3
flex-wrap
"
>


<span

v-for="skill in skills"

:key="skill"

class="
px-4
py-2
rounded-full
bg-white/10
border
border-white/20
text-white
text-sm
backdrop-blur-xl
"

>

{{skill}}

</span>


</div>









<!-- FOOTER -->

<div
class="
mt-10
pt-5
border-t
border-white/20
flex
justify-between
items-center
"
>



<div>

<p
class="
text-white/50
text-sm
"
>

Powered by

</p>


<p
class="
text-white
text-3xl
font-black
"
>

ABANISE

</p>


</div>





<div
class="
w-20
h-20
rounded-[25px]
bg-white/10
border
border-white/20
backdrop-blur-xl
flex
items-center
justify-center
"
>


<Icon

name="heroicons:qr-code"

class="
w-12
h-12
text-white
"

/>


</div>



</div>





</div>





<!-- BOTTOM TEXT -->

<div
class="
absolute
bottom-6
left-0
right-0
text-center
text-white/40
tracking-[8px]
text-xs
"
>

TRUST • VERIFY • CONNECT

</div>



</div>




</template>





<style scoped>


.glass{


background:
linear-gradient(
180deg,
rgba(255,255,255,.22),
rgba(255,255,255,.08)
);


backdrop-filter:
blur(45px)
saturate(180%);


-webkit-backdrop-filter:
blur(45px)
saturate(180%);


border-top:
1px solid rgba(255,255,255,.25);



box-shadow:

0 -20px 60px rgba(0,0,0,.35);



}




</style>