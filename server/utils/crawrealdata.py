import requests
import xlsxwriter
from bs4 import BeautifulSoup



def getDataItem(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'lxml')
    feature_name = soup.select_one('.page-head-title')
    feature_price = soup.select_one('.product-price')
    feature_img = soup.select('.fancyProduct')
    listImg = []
    for img in feature_img:
        listImg.append(img.get('src'))

    # print('Product name: ' + feature_name.text)
    # print('Rating: ' + str(5))
    # print('Price: ' + feature_price.text.replace(" ",
    #       "").replace("₫", "").replace(".", ""))
    # print('List Image: ' + str(listImg))

    return [feature_name.text, str(5), feature_price.text.replace(" ", "").replace("₫", "").replace(".", ""), str(listImg)]


def getListUrlProduct():
    listCate = [
        {
            "cateId": 1,
            "cateUrl": "https://4menshop.com/ao-nam.html"
        },
        {
            "cateId": 2,
            "cateUrl": "https://4menshop.com/quan-nam.html"
        },
        {
            "cateId": 3,
            "cateUrl": "https://4menshop.com/phu-kien-nam.html"
        },
        {
            "cateId": 4,
            "cateUrl": "https://4menshop.com/giay-dep-nam.html"
        },
    ]
    numberProduct = 0
    totalProduct = []
    for cate in listCate:
        url = cate['cateUrl']
        cate_id = cate['cateId']
        print("=> Get list product from " + url)
        listPage = [url]
        for i in range(2, 15):
            listPage.append(url.replace(".html", "/trang-" + str(i) + ".html"))
        for pageUrl in listPage:
            r = requests.get(pageUrl)
            soup = BeautifulSoup(r.content, 'lxml')
            link_product = soup.select('.thumb-img > a')
            for a in link_product:
                productInfo = getDataItem(a.get('href'))
                productInfo.append(cate_id)
                totalProduct.append(productInfo)
                numberProduct = numberProduct + 1
                print("Number product: " + str(numberProduct))
    print("=> Total product: " + str(len(totalProduct)))
    writeToExcel(totalProduct)


def writeToExcel(dataList):
    workbook = xlsxwriter.Workbook('crawed_data.xlsx',)
    worksheet = workbook.add_worksheet()
    worksheet.write('A1', 'name')
    worksheet.write('B1', 'image_url')
    worksheet.write('C1', 'price')
    worksheet.write('D1', 'rating')
    worksheet.write('E1', 'description')
    worksheet.write('F1', 'cate_id')
    worksheet.write('G1', 'product_id')
    id = -1
    row = 0
    for name, rating, price, listImg, cateid in (dataList):
        id += 1
        row += 1
        worksheet.write(row, 0, name)
        worksheet.write(row, 1, listImg)
        worksheet.write(row, 2, price)
        worksheet.write(row, 3, rating)
        worksheet.write(row, 4, "")
        worksheet.write(row, 5, cateid)
        worksheet.write(row, 6, id)
    workbook.close()

getListUrlProduct()
