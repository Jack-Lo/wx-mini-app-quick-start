<view class="g-index">
  <view class="user_info">
    <image class="avt" src="{{userInfo.avatarUrl}}" mode="aspectFill"></image>
    <view class="nick_name">
      {{userInfo.nickName}}
    </view>
  </view>
  <view class="user_motto">
    <text class="motto" bindtap="goToLog">{{motto}}</text>
  </view>
  {% include "../../common/tpl/Hello.swig" %}
</view>
