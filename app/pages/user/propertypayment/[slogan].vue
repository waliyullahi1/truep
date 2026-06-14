<template>

<div class="min-h-screen bg-gray-100 p-6">


<div class="max-w-6xl mx-auto bg-white rounded-xl shadow p-8">


<h1 class="text-3xl font-bold mb-8">
 OPay Payment
</h1>


<div class="grid md:grid-cols-2 gap-10">


<!-- ================= PROPERTY DETAILS ================= -->

<div>


<h2 class="text-xl font-semibold mb-5">
Property Details
</h2>


<div class="border rounded-xl overflow-hidden">


<img
:src="data.property.media.files[0].url"
class="w-full h-56 object-cover"
/>


<div class="p-5">


<h3 class="text-xl font-bold">
{{data.property.title}}
</h3>


<p class="text-gray-500 mt-2">
{{data.property.location.address}},
{{data.property.location.city}},
{{data.property.location.state}}
</p>



<div class="mt-4 space-y-2">


<p>
<b>Type:</b>
{{data.property.type}}
</p>


<p>
<b>Purpose:</b>
{{data.property.purpose}}
</p>


<p>
<b>Owner:</b>
{{data.property.owner.name}}
</p>


</div>



<hr class="my-5">



<!-- SALE -->

<div
v-if="
data.property.purpose==='sale'
"
>


<p class="text-lg">
Price
</p>


<h2 class="text-2xl font-bold text-green-600">

₦{{format(data.property.pricing.price)}}

</h2>


</div>





<!-- RENT -->

<div
v-if="
data.property.purpose==='rent'
"
>


<p class="font-semibold">
Rent Payment
</p>


<h2 class="text-2xl font-bold text-green-600">

₦{{format(data.property.pricing.price)}}

</h2>


<p>
Duration:
{{data.property.pricing.rent.duration.value}}
{{data.property.pricing.rent.duration.unit}}
</p>


</div>






<!-- INSTALLMENT -->

<div
v-if="
data.property.pricing.paymentType==='installment'
"
class="mt-5 bg-gray-50 p-4 rounded-lg"
>


<h3 class="font-bold">
Installment Plan
</h3>


<p>
Duration:
{{data.property.pricing.installment.months}}
months
</p>


<p>
Monthly:
₦{{format(
data.property.pricing.installment.monthlyAmount
)}}
</p>


</div>



</div>

</div>


</div>





<!-- ================= OPAY ================= -->

<div>


<div class="bg-gray-50 rounded-xl p-8">


<p class="text-gray-600">
Recommend use
<span class="text-green-500 font-bold">
OPay
</span>
App to Transfer
</p>



<h1 class="text-5xl font-bold text-center mt-5">
OPay
</h1>



<div class="text-center mt-8">


<h2 class="text-4xl font-bold text-green-500">

{{data.payment.accountNumber}}

</h2>


<button
class="mt-3 text-sm"
@click="copy"
>
Copy
</button>


</div>




<div class="mt-10 space-y-3">


<div class="flex justify-between">

<span>Bank Name</span>

<b>
{{data.payment.bankName}}
</b>

</div>



<div class="flex justify-between">

<span>Account Name</span>

<b>
{{data.payment.accountName}}
</b>

</div>



<div class="flex justify-between">

<span>Total Amount</span>

<b class="text-green-600">

₦{{format(data.payment.amount)}}

</b>

</div>


</div>



<div class="mt-8 text-center">


<p>
Account expires in
<span class="text-red-500">
{{timer}}
</span>
</p>


</div>


</div>



<button
class="
mt-8
w-full
bg-green-500
text-white
py-4
rounded-xl
font-bold
"
>

I've transferred the money

</button>


</div>



</div>


</div>


</div>


</template>



<script setup>

const data = {
payment:{
bankName:"OPay Digital Bank",
accountNumber:"5655255570",
accountName:"Hostinger Nigeria",
amount:55275.87
},

property:{
title:"Modern 3 Bedroom Duplex",
type:"house",
purpose:"sale",

media:{
files:[
{
url:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
}
]
},

location:{
state:"Edo",
city:"Benin City",
address:"GRA Phase 2"
},

pricing:{
price:55000000,
paymentType:"installment",

installment:{
months:24,
monthlyAmount:2300000
},

rent:{
duration:{
value:null,
unit:null
}
}
},

owner:{
name:"John Property Ltd"
}

}

}



const format=(num)=>
new Intl.NumberFormat()
.format(num)



const copy=()=>{

navigator.clipboard.writeText(
data.payment.accountNumber
)

}


</script>