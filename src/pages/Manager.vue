<template>
  <div class="col body" v-if="!isLogin">
    <div class="row justify-left" style="height: 90px">
      <span
        style="
          font-size: 40px;
          color: white; 
          background-color: #1976D2; 
          width: 200px;
          border-radius: 20px;
        "
        @click="toIndex()"
        class="my-font text-h5 q-pa-lg">
        AoGeLai
      </span>
    </div>
    <div class="row justify-center" style="height: 60%;">
        <div class="login-form">
          <div class="title text-h3 text-center">
            <q-item-label>奥格莱管理员登录</q-item-label>
          </div>
          <div class="mobile row justify-center">
            <q-input
              placeholder="请输入用户名"
              v-model="username"
              style="width: 336px;"
            >
              <template v-slot:prepend>
                <q-item-label>用户名</q-item-label>
              </template>
            </q-input>
          </div>
          <div class="yzm row justify-center">
            <q-input
              placeholder="请输入密码"
              v-model="password"
              style="width: 336px;"
              :type="isPwd ? 'password' : 'text'"
              v-on:keyup.enter="loginSubmit"
            >
              <template v-slot:prepend>
                <q-item-label>密码</q-item-label>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row justify-center">
            <q-btn
              unelevated
              class="login-btn"
              color="primary"
              label="登 录"
              :disable="!username || !password"
              @click="loginSubmit"
            />
          </div>
        </div>
    </div> 
  </div>
  
  <div v-else>
    <q-dialog full-width v-model="isPreviewProduct">
      <q-card>
        <div style="background: whitesmoke" class="q-pa-sm" v-for="(img, index) in product_cur_img_path" :key="index">
          <img :src="img">
        </div>
        <q-btn color="primary" style="width: 100%;" v-close-popup>关闭</q-btn>
      </q-card>
    </q-dialog>
    <q-dialog full-width v-model="isPreviewSubProduct">
      <q-card>
        <div style="background: whitesmoke" class="q-pa-sm" v-for="(img, index) in sub_product_cur_img_path" :key="index">
          <img :src="img">
        </div>
        <q-btn color="primary" style="width: 100%;" v-close-popup>关闭</q-btn>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isUploadProductImage">
      <q-card class="q-pa-lg">
        <span style="font-size:larger">
          为 {{product_cur_name}} 选择图片，注意上传的图片会覆盖过去的图片；<br/><br/>
        </span>
        <q-file
          v-model="files"
          label="选取图片"
          filled
          multiple
          style="max-width: 300px"
        />
        <br/><br/>
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="uploadImages('product')" v-close-popup>上传</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isUploadSubProductImage">
      <q-card class="q-pa-lg">
        <span style="font-size:larger">
          为 {{sub_product_cur_name}} 选择图片，注意上传的图片会覆盖过去的图片；<br/><br/>
        </span>
        <q-file
          v-model="files"
          label="选取图片"
          filled
          multiple
          style="max-width: 300px"
        />
        <br/><br/>
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="uploadImages('sub_product')" v-close-popup>上传</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model=isEditProduct>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          编辑产品 <b>{{product_cur_name}}</b> <br/><br/>
        </span>
        <q-input v-model="product_new_name" label="产品新名称" />
        <br/>
        <q-input
          v-model="product_new_intro"
          filled
          type="textarea"
          label="产品新介绍"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="updateProduct()" v-close-popup>更新</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model=isEditSubProduct>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          编辑产品 <b>{{sub_product_cur_name}}</b> <br/><br/>
        </span>
        <q-input v-model="sub_product_new_name" label="产品新名称" />
        <q-input v-model="sub_product_new_type" label="产品新类别" />
        <br/>
        <q-input
          v-model="sub_product_new_intro"
          filled
          type="textarea"
          label="产品新介绍"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="updateSubProduct()" v-close-popup>更新</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model=isAddingProduct>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          添加产品 <br/><br/>
        </span>
        <q-input v-model="product_new_name" label="产品名称" />
        <q-input
          v-model="product_new_intro"
          filled
          type="textarea"
          label="产品介绍"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="addProduct()" v-close-popup>添加</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model=isAddingSubProduct>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          添加产品 <br/><br/>
        </span>
        <q-input v-model="sub_product_new_name" label="产品名称" />
        <q-input v-model="sub_product_new_type" label="产品类别" />
        <q-input
          v-model="sub_product_new_intro"
          filled
          type="textarea"
          label="产品介绍"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="addSubProduct()" v-close-popup>添加</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDeleteProduct" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">确定删除该商品吗？</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="删除" @click="deleteProduct()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDeleteSubProduct" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">确定删除该商品吗？</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="删除" @click="deleteSubProduct()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model=isAddingNews>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          添加新闻 <br/><br/>
        </span>
        <q-input v-model="news_title" label="新闻标题" />
        <q-input
          v-model="news_content"
          filled
          type="textarea"
          label="新闻内容"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="addNews()" v-close-popup>添加</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDeleteNews" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">确定删除该新闻吗？</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="删除" @click="deleteNews()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog full-width v-model="isPreviewNews">
      <q-card>
        <div style="background: whitesmoke" class="q-pa-sm" v-for="(img, index) in news_img_path" :key="index">
          <img :src="img">
        </div>
        <q-btn color="primary" style="width: 100%;" v-close-popup>关闭</q-btn>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isUploadNewsImage">
      <q-card class="q-pa-lg">
        <span style="font-size:larger">
          为 {{news_title}} 选择图片，注意上传的图片会覆盖过去的图片；<br/><br/>
        </span>
        <q-file
          v-model="files"
          label="选取图片"
          filled
          multiple
          style="max-width: 300px"
        />
        <br/><br/>
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="uploadImages('news')" v-close-popup>上传</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model=isEditNews>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          编辑新闻： <b>{{news_title}}</b> <br/><br/>
        </span>
        <q-input v-model="news_title" label="新的新闻标题" />
        <br/>
        <q-input
          v-model="news_content"
          filled
          type="textarea"
          label="新的新闻内容"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="updateNews()" v-close-popup>更新</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    
    <q-dialog v-model=isAddingExample>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          添加案例 <br/><br/>
        </span>
        <q-input v-model="example_title" label="案例标题" />
        <q-input
          v-model="example_content"
          filled
          type="textarea"
          label="案例内容"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="addExample()" v-close-popup>添加</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDeleteExample" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">确定删除该案例吗？</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="删除" @click="deleteExample()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog full-width v-model="isPreviewExample">
      <q-card>
        <div style="background: whitesmoke" class="q-pa-sm" v-for="(img, index) in example_img_path" :key="index">
          <img :src="img">
        </div>
        <q-btn color="primary" style="width: 100%;" v-close-popup>关闭</q-btn>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isUploadExampleImage">
      <q-card class="q-pa-lg">
        <span style="font-size:larger">
          为 {{example_title}} 选择图片，注意上传的图片会覆盖过去的图片；<br/><br/>
        </span>
        <q-file
          v-model="files"
          label="选取图片"
          filled
          multiple
          style="max-width: 300px"
        />
        <br/><br/>
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="uploadImages('example')" v-close-popup>上传</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model=isEditExample>
      <q-card class="q-pa-lg" style="width: 600px">
        <span style="font-size:larger">
          编辑案例： <b>{{example_title}}</b> <br/><br/>
        </span>
        <q-input v-model="example_title" label="新的案例标题" />
        <br/>
        <q-input
          v-model="example_content"
          filled
          type="textarea"
          label="新的案例内容"
        />
        <div class="col">
          <q-btn color="primary" style="width: 50%;" @click="updateExample()" v-close-popup>更新</q-btn>
          <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
        </div>
      </q-card>
    </q-dialog>

    <div class="row justify-left" style="height: 90px">
      <span
        style="
          font-size: 40px;
          color: white; 
          background-color: #1976D2; 
          width: 200px;
          cursor: pointer;
          border-radius: 20px;
        "
        @click="toIndex()"
        class="my-font text-h5 q-pa-lg">
        AoGeLai
      </span>
    </div>
    <q-splitter
      v-model="splitter"
      style="height: 800px"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab class="text-primary" name="products" icon="mdi-door" label="产品" />
          <q-tab class="text-primary" name="sub_products" icon="mdi-door" label="子产品" />
          <q-tab class="text-primary" name="images" icon="mdi-image" label="首页展示图片" />
          <q-tab class="text-primary" name="news" icon="mdi-newspaper" label="新闻资讯" />
          <q-tab class="text-primary" name="examples" icon="mdi-book" label="案例" />
          <q-tab class="text-primary" name="messages" icon="mdi-inbox" label="留言" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="products">
            <div class="q-pa-md">
              <q-btn class="q-mb-md" color="primary" @click="isAddingProduct = true">添加产品</q-btn>
              <q-table
                style="height: 400px"
                title="产品清单"
                :data="productRows"
                :columns="productColumns"
                row-key="name"
              >
                <template v-slot:body-cell-image="props">
                  <q-td :props="props">
                    <q-btn icon="mdi-eye" label="查看" @click="isPreviewProduct = true; getProductInfo(props.row)" />
                    <q-btn icon="mdi-upload" label="上传" @click="isUploadProductImage = true; getProductInfo(props.row)" />
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn icon="mode_edit" label="编辑" @click="isEditProduct = true; getProductInfo(props.row);" />
                    <q-btn icon="delete" label="删除" @click="isDeleteProduct = true; getProductInfo(props.row);" />
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
          <q-tab-panel name="sub_products">
            <div class="q-pa-md">
              <q-btn class="q-mb-md" color="primary" @click="isAddingSubProduct = true">添加产品</q-btn>
              <q-table
                style="height: 400px"
                title="产品清单"
                :data="sub_productRows"
                :columns="sub_productColumns"
                row-key="name"
              >
                <template v-slot:body-cell-image="props">
                  <q-td :props="props">
                    <q-btn icon="mdi-eye" label="查看" @click="isPreviewSubProduct = true; getSubProductInfo(props.row)" />
                    <q-btn icon="mdi-upload" label="上传" @click="isUploadSubProductImage = true; getSubProductInfo(props.row)" />
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn icon="mode_edit" label="编辑" @click="isEditSubProduct = true; getSubProductInfo(props.row);" />
                    <q-btn icon="delete" label="删除" @click="isDeleteSubProduct = true; getSubProductInfo(props.row);" />
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
          <q-tab-panel name="images">
            <div class="text-h4 q-mb-md">首页展示图片</div>
            <p>待开发，此栏目用于管理员自由更换展示图片</p>
            <q-dialog v-model="isChangingIndexImage">
              <q-card class="q-pa-lg">
                <span style="font-size:larger">
                  为 {{now_index_image}} 选择图片，注意上传的图片会覆盖过去的图片；<br/><br/>
                </span>
                <q-file
                  v-model="files"
                  label="选取图片"
                  filled
                  multiple
                  style="max-width: 300px"
                />
                <br/><br/>
                <div class="col">
                  <q-btn color="primary" style="width: 50%;" @click="uploadImageImages()" v-close-popup>上传</q-btn>
                  <q-btn color="red" style="width: 50%;" v-close-popup>关闭</q-btn>
                </div>
              </q-card>
            </q-dialog>
            <q-card style="flat bordered; max-width: 350px;">
              <q-img
                :src="index_image_1"
              />
              <q-card-section>
                <q-btn @click="isChangingIndexImage=true; now_index_image='首页滚动图片1'">修改</q-btn>
              </q-card-section>
            </q-card>
            <br/>
            <q-card style="flat bordered; max-width: 350px;">
              <q-img
                :src="index_image_2"
              />
              <q-card-section>
                <q-btn @click="isChangingIndexImage=true; now_index_image='首页滚动图片2'">修改</q-btn>
              </q-card-section>
            </q-card>
            <br/>
            <q-card style="flat bordered; max-width: 350px;">
              <q-img
                :src="index_image_3"
              />
              <q-card-section>
                <q-btn @click="isChangingIndexImage=true; now_index_image='首页滚动图片3'">修改</q-btn>
              </q-card-section>
            </q-card>
            <br/>
            <q-card style="flat bordered; max-width: 350px;">
              <q-img
                :src="index_background_image"
              />
              <q-card-section>
                <q-btn @click="isChangingIndexImage=true; now_index_image='公司介绍背景图片'">修改</q-btn>
              </q-card-section>
            </q-card>
            <br/>
          </q-tab-panel>
          <q-tab-panel name="news">
            <div class="q-pa-md">
              <q-btn class="q-mb-md" color="primary" @click="isAddingNews = true">添加新闻</q-btn>
              <q-table
                style="height: 400px"
                title="新闻列表"
                :data="newsRows"
                :columns="newsColumns"
                row-key="name"
              >
                <template v-slot:body-cell-image="props">
                  <q-td :props="props">
                    <q-btn icon="mdi-eye" label="查看" @click="isPreviewNews = true; getNewsInfo(props.row)" />
                    <q-btn icon="mdi-upload" label="上传" @click="isUploadNewsImage = true; getNewsInfo(props.row)" />
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn icon="mode_edit" label="编辑" @click="isEditNews = true; getNewsInfo(props.row);" />
                    <q-btn icon="delete" label="删除" @click="isDeleteNews = true; getNewsInfo(props.row);" />
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
          <q-tab-panel name="examples">
            <div class="q-pa-md">
              <q-btn class="q-mb-md" color="primary" @click="isAddingExample = true">添加案例</q-btn>
              <q-table
                style="height: 400px"
                title="案例列表"
                :data="exampleRows"
                :columns="exampleColumns"
                row-key="name"
              >
                <template v-slot:body-cell-image="props">
                  <q-td :props="props">
                    <q-btn icon="mdi-eye" label="查看" @click="isPreviewExample = true; getExampleInfo(props.row)" />
                    <q-btn icon="mdi-upload" label="上传" @click="isUploadExampleImage = true; getExampleInfo(props.row)" />
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn icon="mode_edit" label="编辑" @click="isEditExample = true; getExampleInfo(props.row);" />
                    <q-btn icon="delete" label="删除" @click="isDeleteExample = true; getExampleInfo(props.row);" />
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
          <q-tab-panel name="messages">
            <div class="q-pa-md">
              <q-table
                style="height: 400px"
                title="消息列表"
                :data="messageRows"
                :columns="messageColumns"
                row-key="name"
              >
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>


<script>
import axios from 'axios'
import { Notify } from 'quasar'

export default {
  name: "Manager",
  data() {
    return {
      username: "",
      password: "",
      isPwd: true,
      isLogin: false,

      isAddingProduct: false,
      isDeleteProduct: false,
      isEditProduct: false,
      isPreviewProduct: false,
      isUploadProductImage: false,
      productColumns: [
        {
          name: 'name',
          required: true,
          label: '产品名称',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        { name: 'introduction', align: 'center', label: '产品介绍', field: row => row.introduction, headerClasses: 'bg-primary text-white', headerStyle: 'max-width: 250px', style: 'max-width: 250px', classes: 'bg-grey-2 ellipsis' },
        { name: 'image', align: 'center', label: '产品图片', field: row => row.image_path },
        { name: 'actions', align: 'center', label: '操作', headerClasses: 'bg-primary text-white' }
      ],
      productRows: [],
      product_cur_img_path: [],
      product_cur_introduction: '',
      product_cur_name: '',
      product_cur_id: '',
      product_new_name: '',
      product_new_intro: '',

      isAddingSubProduct: false,
      isDeleteSubProduct: false,
      isEditSubProduct: false,
      isPreviewSubProduct: false,
      isUploadSubProductImage: false,
      sub_productColumns: [
        {
          name: 'name',
          required: true,
          label: '产品名称',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'type',
          required: true,
          label: '系列',
          align: 'left',
          field: row => row.type,
          format: val => `${val}`
        },
        { name: 'introduction', align: 'center', label: '产品介绍', field: row => row.introduction, headerClasses: 'bg-primary text-white', headerStyle: 'max-width: 250px', style: 'max-width: 250px', classes: 'bg-grey-2 ellipsis' },
        { name: 'image', align: 'center', label: '产品图片', field: row => row.image_path },
        { name: 'actions', align: 'center', label: '操作', headerClasses: 'bg-primary text-white' }
      ],
      sub_productRows: [],
      sub_product_cur_img_path: [],
      sub_product_cur_introduction: '',
      sub_product_cur_name: '',
      sub_product_cur_type: '',
      sub_product_cur_id: '',
      sub_product_new_name: '',
      sub_product_new_type: '',
      sub_product_new_intro: '',

      isAddingNews: false,
      isDeleteNews: false,
      isEditNews: false,
      isPreviewNews: false,
      isUploadNewsImage: false,
      newsColumns: [
        {
          name: 'title',
          required: true,
          label: '新闻标题',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`
        },
        { name: 'content', align: 'center', label: '新闻内容', field: row => row.content, headerClasses: 'bg-primary text-white', headerStyle: 'max-width: 250px', style: 'max-width: 250px', classes: 'bg-grey-2 ellipsis' },
        { name: 'time', align: 'center', label: '发布时间', field: row => row.time },
        { name: 'image', align: 'center', label: '新闻图片', field: row => row.image_path },
        { name: 'actions', align: 'center', label: '操作', headerClasses: 'bg-primary text-white' }
      ],
      newsRows: [],
      news_title: '',
      news_content: '',
      news_img_path: '',
      news_time: '',
      news_id: '',

      isAddingExample: false,
      isDeleteExample: false,
      isEditExample: false,
      isPreviewExample: false,
      isUploadExampleImage: false,
      exampleColumns: [
        {
          name: 'title',
          required: true,
          label: '案例标题',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`
        },
        { name: 'content', align: 'center', label: '案例内容', field: row => row.content, headerClasses: 'bg-primary text-white', headerStyle: 'max-width: 250px', style: 'max-width: 250px', classes: 'bg-grey-2 ellipsis' },
        { name: 'image', align: 'center', label: '案例图片', field: row => row.image_path },
        { name: 'actions', align: 'center', label: '操作', headerClasses: 'bg-primary text-white' }
      ],
      exampleRows: [],
      example_title: '',
      example_content: '',
      example_img_path: '',
      example_id: '',

      messageColumns: [
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        { name: 'message', align: 'center', label: '留言内容', field: row => row.message, headerClasses: 'bg-primary text-white', headerStyle: 'max-width: 250px', style: 'max-width: 250px', classes: 'bg-grey-2 ellipsis' },
        { name: 'phone', align: 'center', label: '电话', field: row => row.phone },
        { name: 'email', align: 'center', label: '电话', field: row => row.email },
      ],
      messageRows: [],

      splitter: 20,
      pagination: {
        rowsPerPage: 10
      },
      tab: 'products',
      files: null,

      isChangingIndexImage: false,
      index_image_id: '',
      index_image_1: '',
      index_image_2: '',
      index_image_3: '',
      index_background_image: '',
      now_index_image: ''
    };
  },
  mounted() {
    this.getProducts()
    this.getSubProducts()
    this.getNews()
    this.getExamples()
    this.getMessages()
    this.getIndexImages()
  },
  methods: {
    successNotify(msg) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        message: msg,
        actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
      })
    },
    errorNotify(msg) {
      Notify.create({
        position: 'top-right',
        type: 'negative',
        message: msg,
        actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
      })
    },
    loginSubmit() {
      let data = {
        username: this.username,
        password: this.password
      }
      axios.post("/users/login", data)
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          this.successNotify('登录成功')
          this.isLogin = true
        } else {
          this.errorNotify(response.data.msg)
        }
      })
    },
    getProducts() {
      axios.get("/products/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          this.successNotify('获取产品列表成功')
          this.productRows = response.data.data
        } else {
          this.errorNotify(response.data.msg)
        }
      })
    },
    getSubProducts() {
      axios.get("/sub_products/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          this.successNotify('获取产品列表成功')
          this.sub_productRows = response.data.data
        } else {
          this.errorNotify(response.data.msg)
        }
      })
    },
    getNews() {
      axios.get("/news/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          this.successNotify('获取新闻列表成功')
          this.newsRows = response.data.data
        } else {
          this.errorNotify(response.data.msg)
        }
      })
    },
    getExamples() {
      axios.get("/example/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          this.successNotify('获取案例列表成功')
          this.exampleRows = response.data.data
        } else {
          this.errorNotify(response.data.msg)
        }
      })
    },
    getMessages() {
      axios.get("/message/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          this.successNotify('获取留言列表成功')
          this.messageRows = response.data.data
        } else {
          this.errorNotify(response.data.msg)
        }
      })
    },
    addProduct() {
      let data = {
        "name": this.product_new_name,
        "introduction": this.product_new_intro,
        'image_path': []
      }
      axios.post("/products/add", data)
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          Notify.create({
            position: 'top-right',
            type: 'positive',
            message: '添加产品成功',
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        } else {
          Notify.create({
            position: 'top-right',
            type: 'negative',
            message: response.data.msg,
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        }
      })
      .finally(() => {
        this.getProducts()
        this.clearProducts()
      })
    },
    addSubProduct() {
      let data = {
        "name": this.sub_product_new_name,
        "type": this.sub_product_new_type,
        "introduction": this.sub_product_new_intro,
        'image_path': []
      }
      axios.post("/sub_products/add", data)
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          Notify.create({
            position: 'top-right',
            type: 'positive',
            message: '添加产品成功',
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        } else {
          Notify.create({
            position: 'top-right',
            type: 'negative',
            message: response.data.msg,
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        }
      })
      .finally(() => {
        this.getSubProducts()
        this.clearSubProducts()
      })
    },
    getIndexImages() {
      axios.get("/image/find_all")
      .then( response => {
        this.index_image_id = response.data.data[0]['_id']
        this.index_image_1 = response.data.data[0]['index_image_1']
        this.index_image_2 = response.data.data[0]['index_image_2']
        this.index_image_3 = response.data.data[0]['index_image_3']
        this.index_background_image = response.data.data[0]['index_background_image']
        console.log(response.data.data)
      })
    },
    addNews() {
      let time = new Date().toLocaleString()
      let data = {
        "title": this.news_title,
        "content": this.news_content,
        "time": time,
        'image_path': []
      }
      axios.post("/news/add", data)
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          Notify.create({
            position: 'top-right',
            type: 'positive',
            message: '添加新闻成功',
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        } else {
          Notify.create({
            position: 'top-right',
            type: 'negative',
            message: response.data.msg,
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        }
      })
      .finally(() => {
        this.getNews()
        this.clearNews()
      })
    },
    addExample() {
      let data = {
        "title": this.example_title,
        "content": this.example_content,
        'image_path': []
      }
      axios.post("/example/add", data)
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          Notify.create({
            position: 'top-right',
            type: 'positive',
            message: '添加案例成功',
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        } else {
          Notify.create({
            position: 'top-right',
            type: 'negative',
            message: response.data.msg,
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        }
      })
      .finally(() => {
        this.getExamples()
        this.clearExamples()
      })
    },
    deleteImages(target) {
      if (target == 'product') {
        let data = {
          'image_path': this.product_cur_img_path
        }
        axios.post("/delete-single", data)
        .then( response => {
          console.log(response)
          if (response.data.code == 200) {
            this.successNotify('删除数据库图片成功')
          } else {
            this.errorNotify(response.data.msg)
          }
        })
      }
      if (target == 'sub_product') {
        let data = {
          'image_path': this.sub_product_cur_img_path
        }
        axios.post("/delete-single", data)
        .then( response => {
          console.log(response)
          if (response.data.code == 200) {
            this.successNotify('删除数据库图片成功')
          } else {
            this.errorNotify(response.data.msg)
          }
        })
      }
      if (target == 'news') {
        let data = {
          'image_path': this.news_img_path
        }
        axios.post("/delete-single", data)
        .then( response => {
          console.log(response)
          if (response.data.code == 200) {
            this.successNotify('删除数据库图片成功')
          } else {
            this.errorNotify(response.data.msg)
          }
        })
      }
      if (target == 'example') {
        let data = {
          'image_path': this.example_img_path
        }
        axios.post("/delete-single", data)
        .then( response => {
          console.log(response)
          if (response.data.code == 200) {
            this.successNotify('删除数据库图片成功')
          } else {
            this.errorNotify(response.data.msg)
          }
        })
      }
    },
    getProductInfo(e) {
      this.product_cur_id = e._id
      this.product_cur_name = e.name
      this.product_cur_introduction = e.introduction
      this.product_cur_img_path = e.image_path
      this.product_new_name = e.name
      this.product_new_intro = e.introduction
    },
    getSubProductInfo(e) {
      this.sub_product_cur_id = e._id
      this.sub_product_cur_name = e.name
      this.sub_product_cur_type = e.type
      this.sub_product_cur_introduction = e.introduction
      this.sub_product_cur_img_path = e.image_path
      this.sub_product_new_name = e.name
      this.sub_product_new_type = e.type
      this.sub_product_new_intro = e.introduction
    },
    getNewsInfo(e) {
      this.news_title = e.title
      this.news_content = e.content
      this.news_id = e._id
      this.news_time = e.time
      this.news_img_path = e.image_path
    },
    getExampleInfo(e) {
      this.example_title = e.title
      this.example_content = e.content
      this.example_id = e._id
      this.example_img_path = e.image_path
    },
    clearProducts() {
      this.product_cur_id = ''
      this.product_cur_name = ''
      this.product_cur_introduction = ''
      this.product_cur_img_path = []
      this.product_new_name = ''
      this.product_new_intro = ''
    },
    clearSubProducts() {
      this.sub_product_cur_id = ''
      this.sub_product_cur_name = ''
      this.sub_product_cur_type = ''
      this.sub_product_cur_introduction = ''
      this.sub_product_cur_img_path = []
      this.sub_product_new_name = ''
      this.sub_product_new_type = ''
      this.sub_product_new_intro = ''
    },
    clearNews() {
      this.news_title = ''
      this.news_time = ''
      this.news_content = ''
      this.news_id = ''
      this.news_img_path = []
    },
    clearExamples() {
      this.example_title = ''
      this.example_content = ''
      this.example_id = ''
      this.example_img_path = []
    },
    updateProduct() {
      let data = {
        'id': this.product_cur_id,
        'name': this.product_new_name,
        'introduction': this.product_new_intro,
        'image_path': this.product_cur_img_path
      }
      axios.post("/products/update", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('更新产品信息成功')
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally( () => {
        this.getProducts()
        this.clearProducts()
      })
    },
    updateSubProduct() {
      let data = {
        'id': this.sub_product_cur_id,
        'name': this.sub_product_new_name,
        'type': this.sub_product_new_type,
        'introduction': this.sub_product_new_intro,
        'image_path': this.sub_product_cur_img_path
      }
      axios.post("/sub_products/update", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('更新产品信息成功')
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally( () => {
        this.getSubProducts()
        this.clearSubProducts()
      })
    },
    updateNews() {
      let data = {
        'id': this.news_id,
        'title': this.news_title,
        'content': this.news_content,
        'image_path': this.news_img_path,
        'time': this.news_time
      }
      axios.post("/news/update", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('编辑新闻成功')
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally( () => {
        this.getNews()
        this.clearNews()
      })
    },
    updateExample() {
      let data = {
        'id': this.example_id,
        'title': this.example_title,
        'content': this.example_content,
        'image_path': this.example_img_path,
      }
      axios.post("/example/update", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('编辑案例成功')
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally( () => {
        this.getExamples()
        this.clearExamples()
      })
    },
    uploadImages(target) {
      let new_image_path = []
      let that = this
      Promise.all(this.files.map(function(e){
        return new Promise(function(resolve, reject){
          let formData = new FormData()
          formData.append('file', e)
          axios.post("/upload-single", formData)
          .then( response => {
            if (response.data.code == 200) {
              that.successNotify('上传图片成功')
              new_image_path.push(response.data.data)
            }
            else {
              that.finally(response.data.msg)
            } 
          })
          .finally(() => {
            resolve()
          })
        })
      }))
      .then(() => {
        new Promise((resolve, reject) => {
          this.deleteImages(target)
          resolve()
        })
        .then(() => {
          if (target == 'product') {
            this.product_cur_img_path = new_image_path
          }
          if (target == 'sub_product') {
            this.sub_product_cur_img_path = new_image_path
          }
          if (target == 'news') {
            this.news_img_path = new_image_path
          }
          if (target == 'example') {
            this.example_img_path = new_image_path
          }
        })
        .then(() => {
          if (target == 'product') {
            this.updateProduct()
          }
          if (target == 'sub_product') {
            this.updateSubProduct()
          }
          if (target == 'news') {
            this.updateNews()
          }
          if (target == 'example') {
            this.updateExample()
          }
        })
        .finally(() => {
          this.files = null
          if (target == 'product') {
            this.clearProducts()
          }
          if (target == 'sub_product') {
            this.clearSubProducts()
          }
          if (target == 'news') {
            this.clearNews()
          }
          if (target == 'example') {
            this.clearExamples()
          }
        })
      })
    },
    uploadImageImages() {
      let that = this
      let formData = new FormData()
      formData.append('file', this.files[0])
      axios.post("/upload-single", formData)
      .then( response => {
        if (response.data.code == 200) {
          that.successNotify('上传图片成功')
          new Promise((resolve, reject) => {
            if (that.now_index_image == '首页滚动图片1') {
              that.index_image_1 = response.data.data
            }
            else if (that.now_index_image == '首页滚动图片2') {
              that.index_image_2 = response.data.data
            }
            else if (that.now_index_image == '首页滚动图片3') {
              that.index_image_3 = response.data.data
            }
            else {
              that.index_background_image = response.data.data
            }
            resolve()
          })
          .then(() => {
            let data = {
              'id': this.index_image_id,
              'index_image_1': this.index_image_1,
              'index_image_2': this.index_image_2,
              'index_image_3': this.index_image_3,
              'index_background_image': this.index_background_image,
            }
            axios.post("/image/update", data)
            .then( response => {
              if (response.data.code == 200) {
                this.successNotify('更改首页图片成功')
              } else {
                this.errorNotify(response.data.msg)
              }
            })
          })
        }
        else {
          that.errorNotify(response.data.msg)
        } 
      })
    },
    deleteProduct() {
      let data = {
        'id': this.product_cur_id,
      }
      axios.post("/products/delete", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('删除产品成功')
          this.deleteImages()
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally(() => {
        this.getProducts()
        this.clearProducts()
      })
    },
    deleteSubProduct() {
      let data = {
        'id': this.sub_product_cur_id,
      }
      axios.post("/sub_products/delete", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('删除产品成功')
          this.deleteImages()
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally(() => {
        this.getSubProducts()
        this.clearSubProducts()
      })
    },
    deleteNews() {
      let data = {
        'id': this.news_id,
      }
      axios.post("/news/delete", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('删除新闻成功')
          // this.deleteImages()
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally(() => {
        this.getNews()
        this.clearNews()
      })
    },
    deleteExample() {
      let data = {
        'id': this.news_id,
      }
      axios.post("/example/delete", data)
      .then( response => {
        if (response.data.code == 200) {
          this.successNotify('删除案例成功')
          // this.deleteImages()
        } else {
          this.errorNotify(response.data.msg)
        }
      })
      .finally(() => {
        this.getExamples()
        this.clearExamples()
      })
    },
    toIndex() {
      this.$router.push({path: '/'})
    }
  }
}
</script>


<style lang="stylus" scoped>
.body
  height: 960px;

.logo-icon
  height:145px;
  .welcome
    color: black;
  .logo
    img
      width:64px;
      height:64px;

.copyright
  margin-top: 36px;
  height:17px;
  font-size:12px;
  font-family:Helvetica;
  color:rgba(153,153,153,1);
  line-height:14px;

.login-form
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 24px 0px rgba(172,178,192,0.15);
  border-radius:0px 12px 12px 0px;
  .title
    margin-top: 74px;
    font-size: 30px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51,51,51,1);
    line-height: 30px;
  .mobile
    margin-top: 74px;
    .q-item__label
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:20px;
  .yzm
    margin-top: 34px;
    .q-item__label
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:20px;
    .yzm-action
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(52,200,231,1);
      line-height:20px;
  .login-btn
    margin-top:38px;
    width:336px;
    height:54px;
    background:rgba(52,200,231,1);
    border-radius:27px;
</style>