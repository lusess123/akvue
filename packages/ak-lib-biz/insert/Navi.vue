<template>
     <Card>
         <Steps :current="GroupIndex" >
<Step :title="colGroup.DisplayName"   v-for="colGroup in  ColumnGroups"  :key="colGroup.Name" ></Step>
<Step title="新建成功"></Step>
</Steps>
    </Card>
</template>

<script>
export default {
    props:["ColumnGroups","GroupIndex"],

}
</script>

<style>

</style>
