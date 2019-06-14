---
id: id-imlib-guide-ios
summary: iOS IMLib 集成指南，引导开发者调用 IMLib 中必要的接口，实现即时通讯功能的步骤说明。
categories: GUIDE
tags: tutorial, guidelines, guide, write, contribute
difficulty: 3
status: published
published: 2019-06-04
author: RongCloud iOS Team

---

# iOS IMLib 集成指南

## 导入 SDK

Duration: 3:00

**CocoaPods安装** 
请参照 [CocoaPods 安装](https://cocoapods.org/)

**使用 CocoaPods 导入融云 SDK** 
1、 执行 **`pod search RongCloudIM`**


![1558355608531](/images/1558355608531.png)

	
2、 **`cd`** 到 工程目录
	
3、 执行 **`pod init`**
	
4、 执行 **`open -e Podfile`**
	
5、 添加 **`pod`** 内容: `pod 'RongCloudIM/IMLib', '~> 2.9.16'`
	
6、  执行 **`pod install`**
	
7、 双击 **`.xcworkspace`** 文件

## 引入 SDK

Duration: 3:00

使用 SDK 功能前，请 `import` 下面的头文件，`Swift` 项目需要在工程的 `Bridging-Header.h` 文件中添加 SDK 的引用。

```objectivec
#import <RongIMLib/RongIMLib.h>
```

## 初始化

Duration: 5:00

1、 请使用开发功能之前从[融云开发者控制台](https://developer.rongcloud.cn/app/appkey/iwj1eg7Wb9M437VP1w==)注册得到的 `Appkey`，通过 `RCIMClient` 的单例，传入 `initWithAppKey:` 方法，初始化 SDK。
2、 开发者在使用融云 SDK 所有功能之前，开发者必须先调用此方法初始化 SDK。 在 App 的整个生命周期中，开发者只需要将 SDK 初始化一次。

```objectivec
[[RCIMClient sharedRCIMClient] initWithAppKey:@"Your Appkey"];
```

## 连接融云

Duration: 3:00

1、 `token` 即用户令牌，相当于您 APP 上当前用户连接融云的身份凭证。在您连接融云服务器之前，您需要请求您的 App Server，您的 App Server 通过融云 [Server API 获取 Token](https://docs.rongcloud.cn/im/server/user/#token) 并返回给您的客户端，客户端获取到这个 Token 即可连接融云服务器。
2、 `success` 即连接成功回调，会返回 `token` 对应的 `userId`。
3、 `error` 即连接失败回调，请您检查客户端初始化使用的 `AppKey` 和您服务器获取 `token` 用的 `AppKey` 是否一致；
4、 `tokenIncorrect` 即过 `token` 过期回调，是因为您在开发者后台设置了 `token` 过期时间，您需要请求您的服务器重新获取 `token` 并再次用新的 `token` 建立连接。

```objectivec
[[RCIMClient sharedRCIMClient]
        connectWithToken:@"token"
        success:^(NSString *userId) {
         
        }
        error:^(RCConnectErrorCode status) {
         
        }
        tokenIncorrect:^{
         
     }];

```

## 获取会话列表

Duration: 3:00

1、 获取到所有单聊会话，如果需要获取更多会话类型的会话，可以增加数组中的会话类型对象。
2、 可以将获取到的会话列表数用 `UITableView` 来展示。

```objectivec
NSArray *conversationList = [[RCIMClient sharedRCIMClient] getConversationList:@[@(ConversationType_PRIVATE)]];
```

## 发送单聊文本消息

Duration: 3:00

1、 构造文本消息对象。
2、 调用 `RCIMClient` 中 `sendMessage` 方法发送。
3、 `success` 即发送成功回调，会返回消息的 `messageId`。
4、 `error` 即发送失败回到，会返回消息的 `messageId` 和 发送失败的错误码 `nErrorCode`。

```objectivec
    RCTextMessage *txtMessage = [RCTextMessage messageWithContent:@"测试文本消息"];
    [[RCIMClient sharedRCIMClient]
                sendMessage:ConversationType_PRIVATE
                targetId:@"tester1"
                content:txtMessage
                pushContent:@"远程推送显示的内容"
                pushData:@"远程推送的附加信息"
                success:^(long messageId) {
        
                }
                error:^(RCErrorCode nErrorCode, long messageId) {
        
    }];
```

## 接收消息
1、 设置接收消息监听代理。

```objectivec
// 设置消息接收监听
[[RCIMClient sharedRCIMClient] setReceiveMessageDelegate:self object:nil];
```

2、 实现接收消息回到方法。

```objectivec
- (void)onReceived:(RCMessage *)message
              left:(int)nLeft
            object:(id)object {
    if ([message.content isMemberOfClass:[RCTextMessage class]]) {
        RCTextMessage *testMessage = (RCTextMessage *)message.content;
        NSLog(@"消息内容：%@", testMessage.content);
    }

    NSLog(@"还剩余的未接收的消息数：%d", nLeft);
}
```

## 获取历史消息

Duration: 3:00

1、 从本地数据库中获取历史消息。
2、 `oldestMessageId` 传 **-1** 即从最新的一条消息开始获取。
3、 `count` 即获取消息的数量。
4、 `RCIMClient` 类中还有其他获取历史消息的接口，可根据自己的需求调用。
5、 如需从融云的服务器拉取历史消息，需要开通 [“IM 商用版 - 单群聊云存储”](https://support.rongcloud.cn/ks/OTE0#2) 功能。

```objectivec
[[RCIMClient sharedRCIMClient]
            getHistoryMessages:ConversationType_PRIVATE
            targetId:@"tester1"
            oldestMessageId:-1
            count:10];

```

## 断开连接

Duration: 2:00

1、 断开融云连接后不会再收到消息。
2、 在下次连接融云成功后，会收取上次离线后的消息，离线消息最多可以保存 **7** 天。

```objectivec
[[RCIMClient sharedRCIMClient] logout];
```

## 参考

如需了解更多 `IMLib` 集成相关知识，请访问[融云开发文档](https://docs.rongcloud.cn/im/imlib/ios/quick-start/import)