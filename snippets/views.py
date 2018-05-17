from django.shortcuts import render
from rest_framework import generics
from snippets.models import Post
from snippets.serializers import PostSerializer
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from snippets.models import Post
from django.http import HttpResponse
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle,Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.pagesizes import letter, inch,A4
from reportlab.pdfbase.ttfonts import TTFont
import json
from bidi.algorithm import get_display
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from snippets.models import Operator
@csrf_exempt
def user_login(request):
    context = RequestContext(request)
    if request.method == 'POST':
          username = request.POST['username']
          password = request.POST['password']
          MyOperator = request.POST['root']
          user = authenticate(username=username, password=password)

          if user is not None:

              Query = Operator.objects.filter(CompID=int(user.pk)) & Operator.objects.filter(OperatorName=MyOperator);
              if  Query.count():
                  Oper={"id":Query.first().pk,"Name":Query.first().OperatorName}
              # if user.is_active:
                  request.session['Operator'] = Oper
                  login(request, user)
                  # Redirect to index page.
                  return HttpResponseRedirect("groups/")
              else:
                  # Return a 'disabled account' error message
                  return HttpResponse("You're account is disabled.")
          else:
              # Return an 'invalid login' error message.
              print  ("invalid login details " + username + " " + password)
              return render_to_response('registration/login.html', {}, context)
    else:
        # the login is a  GET request, so just show the user the login form.
        return render_to_response('registration/login.html', {}, context)

def TestFromHomeIndex(request):
   return render(request,'snippets/main.html')


def TestIndex(request):
   return render(request,'snippets/Test.html')

@csrf_exempt
def PostList(request):
    if(request.method=="GET"):
        post=Post.objects.all()
        seralizer = PostSerializer(post,many=True)
        return JsonResponse(seralizer.data,safe=False)
    elif (request.method=="POST"):
        data=JSONParser.parse(request)
        seralizer=PostSerializer(data=data)
        if(seralizer.is_valid()):
            seralizer.save()
            return JsonResponse(data==data,status=201)
        return JsonResponse(seralizer.errors,status=401)




@csrf_exempt
def ActiveUsers(request):
    counts =request.online_now.count();
    data = {"Data":counts}
    return JsonResponse(data)

@csrf_exempt
def TestPost(request):
    RecievedData = list(json.loads(request.POST.get('deal', None)))
    po =Post();
    po.user=request.user;
    po.title=RecievedData[0]['title']
    po.contents = RecievedData[0]['contents']
    po.timestamp = RecievedData[0]['timestamp']
    po.save()
    return JsonResponse({"Data":RecievedData})

# This webservice is used to receive data and send related data using json format
@csrf_exempt
def TestGet(request):
    ResponseData={};
    Newdata=request.GET;
    user=User.objects.filter(username=Newdata['name']);
    ResponseData={"id":user[0].pk};
    return JsonResponse(ResponseData)
    # return HttpResponse(serializers.serialize("json", user),
    #                          content_type='application/json')

cm = 2.54
import arabic_reshaper
def some_view(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=somefilename.pdf'
    style = ParagraphStyle(
        name='Normal',
        fontSize=8,

    )


    pdfmetrics.registerFont(TTFont("times", settings.BASE_DIR+"/snippets/static/fonts/times.ttf"))

    doc = SimpleDocTemplate(response, pagesize=letter)
    # container for the 'Flowable' objects
    elements = []
    d=[];
    sunArr=[]

    for i in [1,2,3,4]:
        sunArr=[]
        for j in [10,20,30,40,50]:
            sunArr.append(i+j);
        d.append(sunArr)

    barcode_string = ''
    # text = get_display(arabic_reshaper.reshape(barcode_string))
    # elements.append(Paragraph(text, style=style))
    barcode_string = '<font name="times" size="12">%s</font>' % "الاسم"
    text = get_display(arabic_reshaper.reshape(barcode_string))
    barcode_string1 = '<font name="times" size="12">%s</font>' % "الرقم"
    text2= get_display(arabic_reshaper.reshape(barcode_string1))

    q=User.objects.all();
    pk=[];
    user=[];
    pasS=[];
    all=[];
    all.append( [Paragraph(text, style=style),  Paragraph(text2, style=style) ])
    for i in q:
        # barcode_string = '<font name="times" size="12">%s</font>' % i.pk
        pk.append(i.pk)
        user.append(i.username)
        pasS.append(i.password)
    for i in range(q.count()):
        barcode_string = '<font name="times" size="12">%s</font>' % user[i]
        text = get_display(arabic_reshaper.reshape(barcode_string))

        barcode_string1 = '<font name="times" size="12">%s</font>' % pk[i]
        text2 = get_display(arabic_reshaper.reshape(barcode_string1))
        all.append([Paragraph(text, style=style),Paragraph(text2, style=style)])


    data = [['00', '01', '02', '03', '04'],
            ['10', '11', '12', '13', '14'],
            ['20', '21', '22', '23', '24'],
            ['30', '31', '32', '33', '34']]
    t = Table(all,[2*inch,0.8 * inch])
    t.setStyle(TableStyle([
                           ('TEXTCOLOR', (0, 0), (-1, -4), colors.white),
                           # ('BACKGROUND', (0, 0), (-1, -4), colors.red),
                           ('TEXTCOLOR', (0, 0), (0, -1), colors.blue),
                           # ('ALIGN', (0, -1), (-1, -1), 'CENTER'),
                           ('VALIGN', (0, -1), (-1, -1), 'MIDDLE'),
                           ('TEXTCOLOR', (0, -1), (-1, -1), colors.green),
                           ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
                           ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
                           ('ALIGN', (0, 0), (-1, -4), 'RIGHT'),
                           ]))

    elements.append(t)
    # write the document to disk
    styles = getSampleStyleSheet()
    barcode_string = '<font name="times" size="12">%s</font>' % User.objects.filter(username="حاكم")[0].username
    text=get_display(arabic_reshaper.reshape( barcode_string))
    elements.append( Paragraph(text, style=style))
    doc.build(elements)
    return response

from django.http import HttpResponse
from django.views.generic import View
from DjangoReact.utils  import render_to_pdf  # created in step 4
from django.template.loader import get_template
@csrf_exempt
def htmlpdf(request,*args, **kwargs):
            template = get_template('snippets/pdf.html')
            context = {
                "invoice_id": 123,
                "customer_name":User.objects.filter(username="حاكم")[0].username,
                "amount": 1399.99,
                "today": "Today",
            }
            html = template.render(context)
            pdf = render_to_pdf('snippets/pdf.html', context)
            if pdf:
                response = HttpResponse(pdf, content_type='application/pdf')
                filename = "Invoice_%s.pdf" % ("12341231")
                content = "inline; filename='%s'" % (filename)
                download = request.GET.get("download")
                if download:
                    content = "attachment; filename='%s'" % (filename)
                response['Content-Disposition'] = content
                return response
            return HttpResponse("Not found")