<style lang="less">
    @import './styles/infor-card.less';
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con">
            <Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <template v-if="AwsomeIconType">
                    <i :class="awSomefontClass" v-bind:style="{fontSize:ciconSize}" ></i>
                    </template>
                    <template v-else>
                         <Icon :type="iconType" :size="ciconSize"></Icon>
                    </template>
                </Row>
            </Col>
            <Col span="16" class="height-100">
                <Row type="flex" align="middle" justify="center" class="height-100">
                    <count-up 
                        class="infor-card-count user-created-count" 
                        :id-name="idName" 
                        :end-val="endVal" 
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                        :TextStr="TextStr"
                    >
                        <p class="infor-intro-text" slot="intro">{{ introText }}</p>
                    </count-up>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    computed:{
        awSomefontClass:function(){
              return "fa fa-"+this.AwsomeIconType.replace(/fa-/i, "");
        },
        ciconSize:function(){
            return !this.TextStr ? this.countSize : "2.5rem" ;
        }
    },
    props: {
        AwsomeIconType:String,
        TextStr:String ,
        idName: String,
        endVal: Number,
        color: String,
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '35px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        }
    }
};
</script>

