import { HttpService, Injectable } from '@nestjs/common';
import { DailyMotionDto } from 'src/dto/daily-motion.dto';
import { IResponse } from 'src/response/IResponse';
var axios = require('axios');
var FormData = require('form-data');
var qs = require('qs');


@Injectable()
export class DailyMotionService {
  constructor(
    private http: HttpService,
  ) { }

  async getAccessToken(dailmotiondto: DailyMotionDto) {
    var responseData: IResponse = {
      statusCode: "",
      message: "",
      data: ""
    };
    var data = new FormData();
    data.append('grant_type', dailmotiondto.grant_type);
    data.append('client_id', dailmotiondto.client_id);
    data.append('client_secret', dailmotiondto.client_secret);
    data.append('username', dailmotiondto.username);
    data.append('password', dailmotiondto.password);

    var config = {
      method: 'post',
      url: 'https://api.dailymotion.com/oauth/token',
      headers: {
        'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED; sdx=CJHsFrf6i6B4cHyAq6aTlZ-ioBg4QgGSncfJelkV_NwJCK9amEjr-073CGwLlKJ4',
        ...data.getHeaders()
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        responseData = {
          statusCode: "200",
          message: "Token Access successfully",
          data: JSON.stringify(response.data)
        }

        console.log("response data ", responseData)
        return responseData;
      })
      .catch(function (error) {
        console.log(error);
        const response: IResponse = {
          statusCode: "200",
          message: error.message,
        }
        return response;
      });
  }

  async uploadvideo(dailmotiondto: DailyMotionDto) {
    var videoIddata = new FormData();
    var videoconfig = {
      method: 'post',
      url: 'https://api.dailymotion.com/me/videos',
      headers: {
        'Authorization': 'Bearer '+dailmotiondto.token,
        'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED; sdx=CJHsFrf6i6B4cHyAq6aTlZ-ioBg4QgGSncfJelkV_NwJCK9amEjr-073CGwLlKJ4',
        ...videoIddata.getHeaders()
      },
      data: videoIddata
    };

    axios(videoconfig)
      .then(function (response) {
        console.log("Video Id created ",JSON.stringify(response.data.id));
        // var data = qs.stringify({
        //   'channel': dailmotiondto.channel,
        //  'title': dailmotiondto.title,
        //  'url': dailmotiondto.url,
        //  'published': 'true' 
        //  });
        //  var config = {
        //    method: 'post',
        //    url: 'https://api.dailymotion.com/video/'+response.data.id,
        //    headers: { 
        //      'Authorization': 'Bearer '+dailmotiondto.token, 
        //      'Content-Type': 'application/x-www-form-urlencoded', 
        //      'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED; sdx=CJHsFrf6i6B4cHyAq6aTlZ-ioBg4QgGSncfJelkV_NwJCK9amEjr-073CGwLlKJ4'
        //    },
        //    data : data
        //  };
        var data = qs.stringify({
          'channel': 'music',
         'title': 'sofadog',
         'url': 'https://so-fa-dog-ou-res.cloudinary.com/video/upload/ar_9:19,c_fill/v1607397281/explainer_cxvqcc.mp4',
         'published': 'true' 
         });
         var config = {
           method: 'post',
           url: 'https://api.dailymotion.com/video/x7zgm5y',
           headers: { 
             'Authorization': 'Bearer YXFYCQ8FBVxQWAwNCwxVGAMdCVAQQAEWDAFHDg0ADFBF', 
             'Content-Type': 'application/x-www-form-urlencoded', 
             'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED; sdx=CJHsFrf6i6B4cHyAq6aTlZ-ioBg4QgGSncfJelkV_NwJCK9amEjr-073CGwLlKJ4'
           },
           data : data
         };
        axios(config)
          .then(function (response) {
            console.log("Video Upload data ", JSON.stringify(response.data))
            
          })
          .catch(function (error) {
            console.log(error);
            const response: IResponse = {
              statusCode: "200",
              message: error.message,
            }
            return response;
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}