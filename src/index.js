import './scss/style.scss';
import "./css/style.css";
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';
import "jquery-ui/ui/widgets/draggable";
// هنا قمنا باستيراد الحزمة كموديول 
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';
// استخدمنا المكتبة دي عشان مكتبة يو اي لوحدها مش حتقدر تخلي السليدر يشتغل بالتاتش في شاشات الموبايل والتابليت
// فلازم نستخدم المكتبة دي ولازم قبل مانستخدم المكتبة دي تكون مكتبة يو اي اصلا عندنا

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(".add-to-cart-btn").click(function(){
      alert("اهلا بك في عربة المتجر");
    });

    
    $("#copyright").text("جميع الحقوق محفوظة" + new Date().getFullYear() );


    $('.product-option input[type="radio"]').change(function(){
      $(this).parents(".product-option").siblings().removeClass('active');
                                          // المقصود بها روح لاخوات اباءهم اللي هما كل اللي عندهم product-option
      $(this).parents(".product-option").addClass('active');

       });

    $('[data-product-quantity]').change(function(){
      var newQuantity = $(this).val();

      var parent = $(this).parents('[data-product-info]');

      var pricePerUnit = parent.attr('data-product-price');
                                // attr ده بيستخدم عشان اجيب القيمة بتاعت الخاصية اللي انا باستدعيها

      var totalPriceForProduct = pricePerUnit * newQuantity ;

      parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

      calculateTotlaPrice();
      // وهنا حطينا الدالة اللي احنا عملناها هنا عشان لازم يحصل حذث اللي هو تغيير قيم كميات المنتج عشان تتم الدالة دي
    });

    $('[data-remove-from-cart]').click(function(){
      $(this).parents('[data-product-info]').remove();
      calculateTotlaPrice();
      // بعد ما قمنا بحذف المنتج بالزرار الخاص بالحذف لازم ننفذ ظالة حساب السعر الاجمالي تاني
    })

    function calculateTotlaPrice(){
      var totalPriceForAllProducts =0;

      $('[data-product-info]').each(function(){
        //  دي عاملة شبه اللووب يعني سجلنا اول قيمة لاول منتج وبعد كدة نزود عليه التاني والتالت وهكذا مع العلم ان 
        // قيمة المتغير اللي احنا كاتبينه فوق ده حيتغير بالقيمة بتاعت المنتج اللي بتحصل عليه اللوب وهكذا
        var pricePerUnit = $(this).attr('data-product-price');
        var quantity = $(this).find('[data-product-quantity]').val();
        var totalPriceForProduct = pricePerUnit * quantity

        totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct ;

      });

      $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    };

    var CitiesBYCountry = {
      sa : ["الرياض ","الدمام"],
      eg : ["القاهرة", "الاسكنرية"],
      jo : ["عمان" ,"الزرقاء"],
      sy : ["دمشق","حلب" ,"حماة"]
    }

    $('#form-checkout select[name="country"]').change(function(){
      var country = $(this).val();
      var cities = CitiesBYCountry[country];

      $('#form-checkout select[name="city"]').empty();
                            // السطر ده اهميته عشان لو المستخدم اختار مثلا مصر بعد كدة غيرها واختار السعودية
      $('#form-checkout select[name="city"]').append(
        '<option value="" disabled selected>اختر المدينة</option>'
      );

      cities.forEach(function(city){
            // المقصود كل مدينة من المدن اللي متخزنة في ال sa مثلا
            // city مقصود بيها كل قيمة في المصفوفة علي حدا
        var newOption = $('<option></option>');
            // حنعمل لكل واحدة option ليه تكست وفاليو
        newOption.text(city);
        newOption.val(city);
        $('#form-checkout select[name="city"]').append(newOption);
      })

    });

    $('#form-checkout input[name="payment-method"]').change(function(){

      var paymentMethod = $(this).val();

      if (paymentMethod === 'on-delivery'){
        $('#credit-card-info input').prop('disabled', true);

      }else{
        $('#credit-card-info input').prop('disabled', false);
      }
      $('#credit-card-info ').toggle();
      // هنا بعد ماخلينا الخاصية ديسابيلد تتشال وتتحط عادي بس الفكرة ان المكان نفسه اللي بضيفله الخاصية 
      // لازم يتضافله خاصية التقليب بين الحالتين فعشان كدة ضفناله toggle()
    })

    $("#price-range").slider({
      range : true ,
      // وده عشان يخلي السليدر ليه مقبضين ينفع يتحركو ويدو قيم لو فولس حيكون واحد بس
      min : 50 ,
      max : 1000 ,
      // دول القيم العليا والصغري للرينج ده
      step : 50 ,
      // يعني كل خطوة حتكون ب 50
      values :[250,800],
      // دي القيم اللي ثابته في السليدر قبل مايتحرك
      slide: function(event , ui) {
        // هنا حنستخدم الخاصية سليد علي السليدر ونحدد فيها دالة في حالة 
        // حدوث السليد استخدم ui
        // حيتسجل القيمة اللي تخص المحرك الاولاني 
        // والقيمة اللي تخص المحرك التاني اللي ترتيبهم 0 و1 
        // وهنا المقصود يعني المحرك اللي علي الشمال اللي بيتحكم في اول قيمة في المصفوفة
        // اللي هو اصغر رقم وعايزة يحط قيمتها في السبان الاولي
        // وتاني رقم هو الرقم اللي بيتغير بتغيير المحرك اللي علي اليمين اللي بيتحكم في الرقم الكبير
        // وهنا ملناش دعوة بالقيم اللي فوق دي عشان دي قيم بتظهر بس علي السليدر قبل مانحرك
        // وناخد بلنا ان القيم دي حتتحط في السبان بمجرد حدوث الحدث سليد
        $("#price-min").text(ui.values[0]);
                              // قيمة اليو اي الاولاني 
        $("#price-max").text(ui.values[1]);
                              // قيمة اليو اي التاني 

      }
    })


  });