var kn=Object.create;var lt=Object.defineProperty;var Cn=Object.getOwnPropertyDescriptor;var Pn=Object.getOwnPropertyNames;var $n=Object.getPrototypeOf,jn=Object.prototype.hasOwnProperty;var On=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Pn(t))!jn.call(e,r)&&r!==n&&lt(e,r,{get:()=>t[r],enumerable:!(s=Cn(t,r))||s.enumerable});return e};var h=(e,t,n)=>(n=e!=null?kn($n(e)):{},On(t||!e||!e.__esModule?lt(n,"default",{value:e,enumerable:!0}):n,e));var ke=h(require("express"),1),xn=h(require("cors"),1),vn=h(require("dotenv"),1),An=h(require("cookie-parser"),1),In=h(require("helmet"),1),En=h(require("morgan"),1),Sn=h(require("compression"),1),dt=h(require("path"),1);var Ve=h(require("mongoose"),1),Je=h(require("bcrypt"),1),pt=h(require("jsonwebtoken"),1);var Rn={user:{en:{require_email:"Email is Required",require_pass:"Password is Required",email_exist:"E-mail already exist, please choose another one",create_account:"Your account has been created, A link has been sent to your E-mail, please click on it to verify your E-mail",email_verify:"Pleas Verify Your Email first to login",require_data:"Please Provide The Required Data",account_update:"Account has been Updated",pass_isValid:"Please, write a valid Password",old_pass_isValid:"Old Password isn't correct, please write a valid one",pass_update:"Password has been updated",no_user:"No Users Found",account_delete:"Account has been Deleted",no_email_account:"This Email isn't connected to any account",link_sent:"The Link has been sent",invalid_link:"This Link is Invalid",email_verified:"Congratulation, Your E-mail has been Verified",pass_reset_done:"Congratulation, Your Password has been Reset",wrong_auth:"invalid login or password",email_not_verify:"please verify your E-mail first"},ar:{require_email:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0623\u062F\u062E\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0623\u0644\u0643\u062A\u0631\u0648\u0646\u0649",require_pass:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0623\u062F\u062E\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",email_exist:"\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0623\u0644\u0643\u062A\u0631\u0648\u0646\u0649 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644, \u0645\u0646 \u0641\u0636\u0644 \u0627\u062E\u062A\u0631 \u0628\u0631\u064A\u062F \u0622\u062E\u0631",create_account:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062C\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D, \u0644\u0642\u062F \u062A\u0645 \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u0628\u0637 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0623\u0644\u0643\u062A\u0631\u0648\u0646\u0649 \u0627\u0644\u0649 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0627\u0644\u0643\u062A\u0631\u0648\u0646\u0649, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0627\u0636\u063A\u0637 \u0639\u0644\u064A\u0647 \u0644\u062A\u0641\u0639\u064A\u0644 \u062D\u0633\u0627\u0628\u0643",email_verify:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0642\u0645 \u0628\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u0649 \u0623\u0648\u0644\u0627",require_data:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0623\u062F\u062E\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",account_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D",pass_isValid:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0623\u0643\u062A\u0628 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0635\u062D\u064A\u062D\u0629",old_pass_isValid:"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0627\u0643\u062A\u0628 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0635\u062D\u064A\u062D\u0629",pass_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",no_user:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u0633\u062A\u062E\u062F\u0645",account_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D",no_email_account:"\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u0649 \u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0649 \u062D\u0633\u0627\u0628",link_sent:"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0627\u0628\u0637 \u0628\u0646\u062C\u0627\u062D",invalid_link:"\u0627\u0644\u0631\u0627\u0628\u0637 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",email_verified:"\u062A\u0647\u0627\u0646\u064A\u0646\u0627 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u0649 \u0628\u0646\u062C\u0627\u062D",pass_reset_done:"\u062A\u0647\u0627\u0646\u064A\u0646\u0627 \u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",wrong_auth:"\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u062E\u0627\u0637\u0626\u0629, \u0645\u0646 \u0641\u0636\u0644\u0643 \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0622\u062E\u0631\u0649",email_not_verify:"\u064A\u0631\u062C\u0649 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u0649 \u0623\u0648\u0644\u0627"}},product:{en:{product_exist:"A Product with that name already exist, please choose another one",create_product:"The Product has created",no_product:"No Product Found",product_update:"Product has been updated",image_upload_require:"Please upload the image",image_upload:"The Image has uploaded successfully",no_image:"No Image Found",image_upload_formats:"please upload image with following extension png or jpg",product_delete:"has deleted",product_require_image:"Product require at least one image",image_delete:"image has deleted successfully",item_add:"Item has been added to the cart",no_item:"No Item Found",item_delete:"Item has been removed to the cart",cart_empty:"No Items Found in the Cart",cart_clear:"Cart has been cleared",no_order:"No Orders History to Display",order_update:"The Order has been updated",already_wishlist:"You Already Add this Item to Wishlist",wishlist_add:"The Item has been added to Wishlist"},ar:{product_exist:"\u0625\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0625\u062E\u062A\u0631 \u0627\u0633\u0645 \u0622\u062E\u0631",create_product:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0646\u062A\u062C \u0628\u0646\u062C\u0627\u062D",no_product:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0649 \u0645\u0646\u062A\u062C",product_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u062C \u0628\u0646\u062C\u0627\u062D",image_upload_require:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0642\u0645 \u0628\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629",image_upload:"\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D",no_image:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0649 \u0635\u0648\u0631\u0629",image_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D",product_require_image:"\u0627\u0644\u0645\u0646\u062A\u062C \u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u0649 \u0639\u0644\u0649 \u0635\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",image_upload_formats:"png \u0627\u0648 jpg \u0645\u0646 \u0641\u0636\u0644\u0643 \u0627\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631 \u0628\u0627\u0645\u062A\u062F\u0627\u062F",product_delete:"\u062A\u0645 \u062D\u0630\u0641\u0647 \u0628\u0646\u062C\u0627\u062D",item_add:"\u062A\u0645 \u0623\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0646\u062A\u062C \u0641\u0649 \u0639\u0631\u0628\u0629 \u0627\u0644\u062A\u0633\u0648\u0642",no_item:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u0646\u062A\u062C",item_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0646 \u0639\u0631\u0628\u0629 \u0627\u0644\u062A\u0633\u0648\u0642",cart_empty:"\u0639\u0631\u0628\u0629 \u0627\u0644\u062A\u0633\u0648\u0642 \u062E\u0627\u0644\u064A\u0629",cart_clear:"\u062A\u0645 \u0625\u062E\u0644\u0627\u0621 \u0639\u0631\u0628\u0629 \u0627\u0644\u062A\u0633\u0648\u0642",no_order:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0649 \u0637\u0644\u0628\u0627\u062A \u0633\u0627\u0628\u0642\u0629",order_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628",already_wishlist:"\u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A",wishlist_add:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0646\u062A\u062C \u0641\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A"}},course:{en:{course_create:"The Course has been Created",no_course:"No Course Found",not_enrolled:"Not Enrolled in Any Course Yet",course_update:"Course has been Updated",course_delete:"The Course has been Deleted",ann_create:"The Announcement has been created",no_ann:"No Announcements Found",ann_update:"Announcement has been Updated",ann_delete:"The Announcement has been deleted",no_ann_comment:"Comment can't be added because No Announcement Found",already_ann_comment:"You Already commented on this Announcement",add_ann_comment:"The Comment has been added",no_ann_comments_add:"No Comments have been added yet",end_ann_comments:"End of Comments",no_comments:"No Comments Found",comment_delete:"Comment has been Deleted",chapter_title_exist:"Chapter Title already exist, please choose another title",chapter_create:"The Chapter has been created",no_chapters:"No Chapters Found",no_course_chapters:"No Chapters Found for this course",chapter_update:"Chapter has been updated",chapter_delete:"Chapter has been deleted",lesson_title_exist:"Lesson title already exist, please choose another title",lesson_create:"The Lesson has been created",no_lesson:"No Lesson Found",lesson_update:"Lesson has been updated",lesson_delete:"The Lesson has been deleted",already_enrolled:"You already Enrolled in this Course",new_enroll:"Congratulation for Enrolling in this Course",no_enroll:"No Enrollment Found",no_course_enroll:"You not Enrolled in this course",lesson_complete:"The Lesson Already Completed",instructor_exist:"This instructor already exist",instructor_add:"The Instructor has been added",no_instructor:"No Instructor Found",instructor_update:"Instructor has been Updated",instructor_delete:"The Instructor has been Deleted",review_no_instructor:"Review can't be added because No instructor Found",already_review:"You Already reviewed the instructor",review_add:"The Review has been added",end_reviews:"End of Reviews",delete_review:"Review has been Deleted",note_choose_lesson:"Please Choose a lesson before creating a note",note_create:"Note has been created",no_note:"No Note Found",note_update:"The Note has been updated",no_notes:"No Notes Found",note_delete:"The Note has been removed",already_reviewed:"You already reviewed this course",no_reviews:"No Reviews has been Added yet",review_update:"Review has been Updated",review_delete:"Review has been Deleted",coupon_exist:"You already Created a Coupon with that code",coupon_create:"The Coupon has been created",coupon_not_valid:"Coupon Not Valid",coupon_expired:"Coupon Expired",no_coupon:"No Coupon Found",coupon_update:"Coupon has been Updated",coupon_delete:"Coupon has been Deleted",valid_coupon:"Coupon has Marked as Valid",not_valid_coupon:"Coupon has Marked as Invalid"},ar:{course_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0628\u0646\u062C\u0627\u062D",no_course:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0649 \u062F\u0648\u0631\u0627\u062A \u062A\u062F\u0631\u064A\u0628\u064A\u0629",not_enrolled:"\u063A\u064A\u0631 \u0645\u0633\u062C\u0644 \u0641\u0649 \u0627\u0649 \u062F\u0648\u0631\u0629 \u062A\u062F\u0631\u064A\u0628\u064A\u0629",course_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629",course_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0628\u0646\u062C\u0627\u062D",ann_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D",no_ann:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0627\u0634\u0639\u0627\u0631\u0627\u062A",ann_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0634\u0639\u0627\u0631",ann_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0628\u0646\u062C\u0627\u062D",no_ann_comment:"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0639\u0644\u0649 \u0625\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F",already_ann_comment:"\u0644\u0642\u062F \u0623\u0636\u0641\u062A \u062A\u0639\u0644\u064A\u0642 \u0628\u0627\u0644\u0641\u0639\u0644 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0625\u0634\u0639\u0627\u0631",add_ann_comment:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642",no_ann_comments_add:"\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0649 \u062A\u0639\u0644\u064A\u0642\u0627\u062A",end_ann_comments:"\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A",no_comments:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u062A\u0639\u0644\u064A\u0642\u0627\u062A",comment_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0628\u0646\u062C\u0627\u062D",chapter_title_exist:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0641\u0635\u0644 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0627\u062E\u062A\u0631 \u0639\u0646\u0648\u0627\u0646 \u0622\u062E\u0631",chapter_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0641\u0635\u0644 \u0628\u0646\u062C\u0627\u062D",no_chapters:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0641\u0635\u0648\u0644",no_course_chapters:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0641\u0635\u0648\u0644 \u0644\u0644\u062F\u0631\u0648\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629",chapter_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0635\u0644 \u0628\u0646\u062C\u0627\u062D",chapter_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0641\u0635\u0644 \u0628\u0646\u062C\u0627\u062D",lesson_title_exist:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0631\u0633 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0625\u062E\u062A\u0631 \u0639\u0646\u0648\u0627\u0646 \u0622\u062E\u0631",lesson_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062F\u0631\u0633 \u0628\u0646\u062C\u0627\u062D",no_lesson:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u062F\u0631\u0648\u0633",lesson_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633",lesson_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633 \u0628\u0646\u062C\u0627\u062D",already_enrolled:"\u0623\u0646\u062A \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u0649 \u0647\u0630\u0629 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629",new_enroll:"\u062A\u0647\u0627\u0646\u064A\u0646\u0627, \u0627\u0646\u062A \u0627\u0644\u0622\u0646 \u0645\u0633\u062C\u0644 \u0641\u0649 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629",no_enroll:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0633\u062C\u064A\u0644 \u0641\u0649 \u0627\u0649 \u062F\u0648\u0631\u0629 \u062A\u062F\u0631\u064A\u0628\u064A\u0629",no_course_enroll:"\u0644\u0633\u062A \u0645\u0633\u062C\u0644 \u0641\u0649 \u0647\u0630\u0629 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629",lesson_complete:"\u0627\u0644\u0641\u0635\u0644 \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0643\u062A\u0645\u0644",instructor_exist:"\u0627\u0644\u0645\u062F\u0631\u0628 \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0648\u062C\u0648\u062F",instructor_add:"\u062A\u0645 \u0623\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D",no_instructor:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u062F\u0631\u0628",instructor_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628",instructor_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D",review_no_instructor:"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0644\u0645\u062F\u0631\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F",already_review:"\u0628\u0627\u0644\u0641\u0639\u0644 \u0627\u0636\u0641\u062A \u062A\u0642\u064A\u064A\u0645 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062F\u0631\u0628",end_reviews:"\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",delete_review:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D",note_choose_lesson:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0623\u062E\u062A\u0631 \u0627\u0644\u0641\u0635\u0644 \u0642\u0628\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",note_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D",no_note:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u0644\u0627\u062D\u0638\u0629",note_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D",no_notes:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u0644\u0627\u062D\u0638\u0627\u062A",note_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0628\u0646\u062C\u0627\u062D",already_reviewed:"\u0644\u0642\u062F \u0642\u064A\u0645\u062A \u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0628\u0627\u0644\u0641\u0639\u0644",review_add:"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D",no_reviews:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u062A",review_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D",review_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D",coupon_exist:"\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0627\u062E\u062A\u0631 \u0643\u0648\u062F \u0622\u062E\u0631",coupon_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u0628\u0646\u062C\u0627\u062D",no_coupon:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0643\u0648\u0628\u0648\u0646",coupon_not_valid:"\u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",coupon_expired:"\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0643\u0648\u0628\u0648\u0646",coupon_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0643\u0648\u0628\u0648\u0646",coupon_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u0628\u0646\u062C\u0627\u062D",valid_coupon:"\u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u0627\u0635\u0628\u062D \u0635\u0627\u0644\u062D \u0644\u0644\u0625\u0633\u062A\u062E\u062F\u0627\u0645",not_valid_coupon:"\u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u0627\u0635\u0628\u062D \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0644\u0644\u0625\u0633\u062A\u062E\u062F\u0627\u0645"}},blog:{en:{blog_exist:"A Blog with that name already exist, please choose another one",blog_create:"The Blog has been created",no_blogs:"No Blogs Found",no_blog:"No Blog Found",blog_update:"Blog has been updated",blog_delete:"Blog has been deleted",comment_no_blog:"Comment can't be added because No blog Found",already_comment_blog:"You Already commented on this Blog",blog_comment_add:"The Comment has been added",blog_no_comments:"No Comments have been added yet",blog_end_comments:"End if comments",blog_comment_delete:"Comment has been Deleted"},ar:{blog_exist:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0645\u0648\u062C\u0648\u062F, \u0645\u0646 \u0641\u0636\u0644\u0643 \u0627\u062E\u062A\u0631 \u0639\u0646\u0648\u0627\u0646 \u0622\u062E\u0631",blog_create:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0628\u0646\u062C\u0627\u062D",no_blogs:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u062F\u0648\u0646\u0627\u062A",no_blog:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u062F\u0648\u0646\u0629",blog_update:"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0628\u0646\u062C\u0627\u062D",blog_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0628\u0646\u062C\u0627\u062D",comment_no_blog:"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642 \u0644\u0645\u062F\u0648\u0646\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629",already_comment_blog:"\u0644\u0642\u062F \u0639\u0644\u0642\u062A \u0639\u0644\u0649 \u0647\u0630\u0629 \u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0628\u0627\u0644\u0641\u0639\u0644",blog_comment_add:"\u062A\u0645 \u0627\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0628\u0646\u062C\u0627\u062D",blog_no_comments:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0636\u0627\u0641\u0629 \u062A\u0639\u0644\u064A\u0642\u0627\u062A",blog_end_comments:"\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A",blog_comment_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0628\u0646\u062C\u0627\u062D"}},contact:{en:{contact_sent:"Your Message has been sent",no_contacts:"No Contacts Found",no_contact:"No Contact Found",read_contact:"Contact has Marked as Read",no_read_contact:"contact has Marked as Not Read",contact_delete:"The Contact has been Deleted",already_booked:"You already Booked a Call",booked_call:"The Call has been Booked, wait for response",no_calls_booked:"No Calls has been Booked yet",no_call:"No Call Found",done_call:"Call has Marked as Done",active_call:"Call has Marked as Active",call_delete:"The Call has been Deleted"},ar:{contact_sent:"\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0628\u0646\u062C\u0627\u062D",no_contacts:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0631\u0633\u0627\u0644\u0629",no_contact:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0633\u0627\u0644\u0629",read_contact:"\u062A\u0645 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0631\u0633\u0627\u0644\u0629",no_read_contact:"\u0631\u0633\u0627\u0644\u0629 \u063A\u064A\u0631 \u0645\u0642\u0631\u0648\u0621\u0629",contact_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0628\u0646\u062C\u0627\u062D",already_booked:"\u0644\u0642\u062F \u062D\u062C\u0632\u062A \u0627\u0644\u0645\u0643\u0627\u0644\u0645\u0629 \u0645\u0646 \u0642\u0628\u0644",booked_call:"\u062A\u0645 \u062D\u062C\u0632 \u0627\u0644\u0645\u0643\u0627\u0644\u0645\u0629 \u0628\u0646\u062C\u0627\u062D, \u0646\u0631\u062C\u0648 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",no_calls_booked:"\u0644\u0645 \u064A\u062A\u0645 \u062D\u062C\u0632 \u0645\u0643\u0627\u0644\u0645\u0627\u062A \u0628\u0639\u062F",no_call:"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0649 \u0645\u0643\u0627\u0644\u0645\u0627\u062A",done_call:"\u062A\u0645 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0645\u0646 \u0627\u0644\u062D\u062C\u0632",active_call:"\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u062C\u0632",call_delete:"\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062D\u062C\u0632 \u0628\u0646\u062C\u0627\u062D"}},auth:{en:{log_first:"Please Login First",not_auth:"Not Authorized",valid_api_key:"Please Provide A valid Api Key",not_auth_api:"NOT Authorized to Access the API"},ar:{log_first:"\u0645\u0646 \u0641\u0636\u0644\u0643 \u0633\u062C\u0644 \u062F\u062E\u0648\u0644 \u0627\u0648\u0644\u0627\u064B",not_auth:"\u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D",valid_api_key:"\u0643\u0648\u062F API \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",not_auth_api:"\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0625\u0633\u062A\u062E\u062F\u0627\u0645 API"}}},d=Rn;var ee=new Ve.default.Schema({firstName:{type:String,required:!0},lastName:{type:String,required:!0},email:{type:String,unique:!0,lowerCase:!0,required:!0,match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},phoneNumber:{type:String},password:{type:String,minlength:[8,"Password must be at least eight characters"],match:[/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g,"Password must be at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"]},avatar:{type:String},shippingAddress:{address:{type:String},city:{type:String},postalCode:{type:String},country:{type:String},state:{type:String},mapLink:{type:String}},isEmailVerified:{type:Boolean,default:!1},isPhoneVerified:{type:Boolean,default:!1},isAdmin:{type:Boolean,default:!1},loggedBy:{type:String,default:"local"},AuthString:{type:String}},{timestamps:!0});ee.methods.toJSON=function(){let e=this.toObject();delete e.password,delete e.isEmailVerified,delete e.isPhoneVerified,delete e.AuthString,e.isAdmin||delete e.isAdmin;let t=n=>{for(let s in n)if(n[s])return!0;return!1};return e.shippingAddress&&(t(e.shippingAddress)||delete e.shippingAddress),e};ee.methods.toAuthJSON=function(){return{_id:this._id,firstName:this.firstName,lastName:this.lastName,email:this.email,phoneNumber:this.phoneNumber}};ee.statics.AuthUser=async function(e,t,n,s){let r=await ut.findOne({email:e});if(!r)throw n.status(401),new Error(d.user[s].wrong_auth);if(!await Je.default.compare(t,r.password))throw n.status(401),new Error(d.user[s].wrong_auth);if(!r.isEmailVerified)throw n.status(401),new Error(d.user[s].email_not_verify);return r};ee.methods.generateToken=function(e="7 days"){return pt.default.sign({_id:this._id.toString()},process.env.JWT_TOKEN,{expiresIn:e})};ee.pre("save",async function(e){this.isModified("password")&&(this.password=await Je.default.hash(this.password,10)),e()});var ut=Ve.default.model("User",ee),E=ut;var mt=h(require("jsonwebtoken"),1);var p=async(e,t,n)=>{let{lang:s}=e.headers;try{if(e.cookies.token||e.cookies.tokenAd){let r=e.cookies.token||e.cookies.tokenAd,o=mt.default.verify(r,process.env.JWT_TOKEN,(i,c)=>{if(i)throw new Error(d.auth[s].log_first);return c}),a=await E.findOne({_id:o._id});if(!a)throw t.status(401),new Error(d.auth[s].log_first);e.user=a,e.token=r,n()}else throw t.status(401),new Error(d.auth[s].log_first)}catch(r){n(r)}},u=(e,t,n)=>{let{lang:s}=e.headers;if(e.user.isAdmin){n();return}throw new Error(d.auth[s].not_auth)},ft=(e,t,n)=>{let{lang:s}=e.headers;if(e.headers.apikey)try{if(e.headers.apikey===process.env.APIKEY)n();else throw t.status(401),new Error(d.auth[s].valid_api_key)}catch(r){n(r)}else t.status(401),d?.auth[s]?n(new Error(d.auth[s].not_auth_api)):t.status(403).send(`
        <h1> Forbidden </h1>
        <script> setTimeout(() => window.location.href = 'https://www.gendyecu.com' ,1000) </script>
      `)};var Ye=h(require("mongoose"),1),Ge=h(require("chalk"),1),Dn=async e=>{try{let t=await Ye.default.connect(process.env.MONGODB_URI,{useNewUrlParser:!0,useUnifiedTopology:!0});console.log(Ge.default.greenBright("Mongodb connected",t.connection.host))}catch(t){console.log(Ge.default.redBright("failed to connect to database",t.message))}};Ye.default.set("strictQuery",!1);var gt=Dn;var Mt=h(require("express"),1);var Ce=h(require("mongoose"),1),Tn=new Ce.default.Schema({name:{type:String,required:[!0,"Course Name is Required"]},description:{type:String,required:[!0,"Course Description is Required"]},language:{type:String,default:"arabic"},price:{type:Number},instructor:{type:Ce.default.Schema.Types.ObjectId,ref:"Instructor"},points:[{point:{type:String},order:{type:Number}}],requirements:[{type:String}],image:{type:String},targets:[{type:String}],isPaid:{type:Boolean,default:!1},discount:{type:Number,default:0},driveFile:[{link:String,part:Number}],isPublished:{type:Boolean,default:!1},trailer:String},{timestamps:!0}),S=Ce.default.model("Course",Tn);var We=h(require("mongoose"),1),Bn=new We.default.Schema({name:{type:String,required:[!0,"Product Name is Required"]},short:{type:String},description:{type:String,required:[!0,"Product Description is Required"]},price:{type:Number,required:[!0,"Product Price is Required"]},type:{type:String,required:[!0,"Product Type is Required"]},images:[{src:String}],video:{type:String},image:String,quantity:{type:Number,required:[!0,"Product Quantity is Required"]},isListed:{type:Boolean,default:!1},driveFile:[{link:String,part:Number}],options:[{question:String,elements:Array}]},{timestamps:!0}),N=We.default.model("Product",Bn);var te=h(require("mongoose"),1),zn=new te.default.Schema({user:{type:te.default.Schema.Types.ObjectId,required:!0,ref:"User"},body:{type:String,required:[!0,"Review can't be empty"]},rating:{type:Number,required:[!0,"Rating is Required"]}},{timestamps:!0}),ht=new te.default.Schema({info:{type:te.default.Schema.Types.ObjectId,required:!0,ref:"User"},role:{type:String},about:{type:String},avatar:{type:String},reviews:[zn]},{timestamps:!0});ht.post("save",(e,t)=>{e.populate("info","firstName lastName").then(n=>n.populate("reviews.user","firstName lastName").then(s=>t()))});var k=te.default.model("Instructor",ht);var oe=h(require("mongoose"),1),Fn=new oe.default.Schema({user:{type:oe.default.Schema.Types.ObjectId,required:!0,ref:"User"},comment:{type:String,required:[!0,"Comment can't be Empty"]}},{timestamps:!0}),Ln=new oe.default.Schema({title:{type:String,required:[!0,"Blog title is Required"]},body:{type:String,required:[!0,"Blog Body is Required"]},author:{type:oe.default.Schema.Types.ObjectId,required:!0,ref:"User"},image:{type:String},seen:{type:Number,default:0},comments:[Fn]},{timestamps:!0}),j=oe.default.model("Blog",Ln);var X=h(require("mongoose"),1),Un=new X.default.Schema({user:{type:X.default.Schema.Types.ObjectId,ref:"User",required:!0},course:{type:X.default.Schema.Types.ObjectId,ref:"Course",required:!0},completedLesson:[{type:X.default.Schema.Types.ObjectId,ref:"Lesson"}],completedChapters:[{type:X.default.Schema.Types.ObjectId,ref:"Chapter"}],isCourseCompleted:{type:Boolean,default:!1},currentLesson:{type:X.default.Schema.Types.ObjectId,ref:"Lesson"},progress:{type:Number,default:0},payment:{type:Number,default:0}},{timestamps:!0}),O=X.default.model("Enrollment",Un);var be=h(require("mongoose"),1),Hn=new be.default.Schema({user:{type:be.default.Schema.Types.ObjectId,required:!0,ref:"User"},orderItems:[{quantity:{type:Number,required:!0},options:Array,product:{type:be.default.Schema.Types.ObjectId,required:!0,ref:"Product"}}],shippingAddress:{address:{type:String},city:{type:String},postalCode:{type:String},country:{type:String}},paymentMethod:{type:String,default:"paypal"},paymentResult:{id:{type:String},status:{type:String},update_time:{type:String}},totalPrice:{type:Number,required:!0,default:0},isPaid:{type:Boolean,default:!0},paidAt:{type:Date,default:new Date().toISOString()},isDelivered:{type:Boolean,required:!0,default:!1},deliveredAt:{type:Date}},{timestamps:!0}),z=be.default.model("Order",Hn);var xt=h(require("randomstring"),1);var yt=require("resend");var Mn={activate(e){return`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
		a { color:#66c7ff; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		.hero_bg {
			background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
			margin:0;
			padding: 0;
		}
				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
			
			.text-header,
			.m-center { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			.container { padding: 20px 10px !important }
			
			.td { width: 100% !important; min-width: 100% !important; }

			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p40 { padding: 20px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-empty,
			.column-empty2,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 20px !important; }
			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
					<tr>
						<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
							<!-- Header -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding-bottom: 20px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167" height="75" editable="true" border="0" alt="" /></td>
																	</tr>
																</table>
															</th>
															<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
															<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="text-header" style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link2" style="color:#000; font-weight: 900; text-decoration:none;">Account Activation</webversion></multiline></td>
																	</tr>
																</table>
															</th>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Header -->

							<repeater>
								<!-- Article / Title + Copy + Button -->
								<layout label='Article / Title + Copy + Button'>
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-bottom: 20px;">
												<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
													<tr>
														<td class="p30-15" style="padding: 50px 30px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<!-- <tr>
																	<td class="h3 pb20" style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet consecteur</multiline></td>
																</tr> -->
																<tr>
																	<td class="text pb20" style="color:#777777; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">
																		<multiline>	
                                                                            <p>Hi ${e.name}</p>
                                                                            <p>We Are so happy to have you on board</p> 
                                                                            <p>A new account with your credential has created recently</p>
                                                                            <p>To confirm your account click the button below</p>
                                                                            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                                                                            <p>Thanks,</p>
																		</multiline>
																	</td>
																</tr>
																<!-- Button -->
																<tr>
																	<td align="left">
																		<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom:1rem">
																			<tr>
																				<td class="text-button" style="background:#ffeb3b; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; border-radius:6px;"><multiline><a href="${e.link}" target="_blank" class="link-white" style="color:#363636; text-decoration:none;"><span class="link-white" style="color:#363636; text-decoration:none;">Confirm Account</span></a></multiline></td>
                                                                            </tr>
                                                                            
																		</table>
                                                                        
																	</td>
																</tr>
                                                                <tr>
                                                                    <td>
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button" style="display: block; margin-bottom: 2rem; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; text-align:left; line-height:1.5">${e.link}</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
																<!-- END Button -->
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</layout>	
								<!-- END Article / Title + Copy + Button -->

							<!-- Footer -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="padding-bottom: 30px;">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="https://www.facebook.com/aljazriacademy/" target="_blank"><img src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38" height="38" editable="true" border="0" alt="" /></a></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="text-footer1 pb10" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>Elgendy Autotronics Center</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;"><multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya, Giza Governorate 11511</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30"
													style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
													<a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Footer -->
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

    `},reset(e){return`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
		a { color:#66c7ff; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		.hero_bg {
			background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
			margin:0;
			padding: 0;
		}
				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
			
			.text-header,
			.m-center { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			.container { padding: 20px 10px !important }
			
			.td { width: 100% !important; min-width: 100% !important; }

			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p40 { padding: 20px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-empty,
			.column-empty2,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 20px !important; }
			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
					<tr>
						<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
							<!-- Header -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding-bottom: 20px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167" height="75" editable="true" border="0" alt="" /></td>
																	</tr>
																</table>
															</th>
															<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
															<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="text-header" style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link2" style="color:#000; font-weight: 900; text-decoration:none;">RESET PASSWORD</webversion></multiline></td>
																	</tr>
																</table>
															</th>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Header -->

							<repeater>
								<!-- Article / Title + Copy + Button -->
								<layout label='Article / Title + Copy + Button'>
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-bottom: 20px;">
												<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
													<tr>
														<td class="p30-15" style="padding: 50px 30px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<!-- <tr>
																	<td class="h3 pb20" style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet consecteur</multiline></td>
																</tr> -->
																<tr>
																	<td class="text pb20" style="color:#777777; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">
																		<multiline>	
                                                                            <p>Hi ${e.name}</p>
                                                                            <p>You recently requested to reset your password for your Gendytronics account.</p> 
                                                                            <p> Please click the button below to reset your password.</p>
                                                                            <p>If you did not request a password reset, please ignore this email</p>
                                                                            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                                                                            <p>Thanks,</p>
																		</multiline>
																	</td>
																</tr>
																<!-- Button -->
																<tr>
																	<td align="left">
																		<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom:1rem">
																			<tr>
																				<td class="text-button" style="background:#ffeb3b; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; border-radius:6px;"><multiline><a href="${e.link}" target="_blank" class="link-white" style="color:#363636; text-decoration:none;"><span class="link-white" style="color:#363636; text-decoration:none;">Reset Password</span></a></multiline></td>
                                                                            </tr>
                                                                            
																		</table>
                                                                        
																	</td>
																</tr>
                                                                <tr>
                                                                    <td>
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button" style="display: block; margin-bottom: 2rem; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; text-align:left; line-height:1.5">${e.link}</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table>
                                                                            <tr>
                                                                                <td style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:10px;">NOTE: the link will expire within 24hrs</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
																<!-- END Button -->
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</layout>	
								<!-- END Article / Title + Copy + Button -->

							<!-- Footer -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="padding-bottom: 30px;">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="https://www.facebook.com/aljazriacademy/" target="_blank"><img src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38" height="38" editable="true" border="0" alt="" /></a></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="text-footer1 pb10" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>Elgendy Autotronics Center</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;"><multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya, Giza Governorate 11511</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30"
													style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
													<a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Footer -->
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

`},support(e){return`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
		a { color:#66c7ff; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		.hero_bg {
			background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
			margin:0;
			padding: 0;
		}
				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
			
			.text-header,
			.m-center { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			.container { padding: 20px 10px !important }
			
			.td { width: 100% !important; min-width: 100% !important; }

			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p40 { padding: 20px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-empty,
			.column-empty2,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 20px !important; }
			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
					<tr>
						<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
							<!-- Header -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding-bottom: 20px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167" height="75" editable="true" border="0" alt="" /></td>
																	</tr>
																</table>
															</th>
															<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
															<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="text-header" style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link2" style="color:#000; font-weight: 900; text-decoration:none;">SUPPORT</webversion></multiline></td>
																	</tr>
																</table>
															</th>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Header -->

							<repeater>
								<!-- Article / Title + Copy + Button -->
								<layout label='Article / Title + Copy + Button'>
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-bottom: 20px;">
												<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
													<tr>
														<td class="p30-15" style="padding: 50px 30px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<!-- <tr>
																	<td class="h3 pb20" style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;"><multiline></multiline></td>
																</tr> -->
																<tr>
																	<td class="text pb20" style="color:#777777; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">
																		<multiline>	
                                                                           ${e.name?`<p>Hi ${e.name}</p>`:""}
                                                                            ${e.html}
																		</multiline>
																	</td>
																</tr>
																<!-- Button -->
																<!-- <tr>
																	<td align="left">
																		<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom:1rem">
																			<tr>
																				<td class="text-button" style="background:#ffeb3b; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; border-radius:6px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#363636; text-decoration:none;"><span class="link-white" style="color:#363636; text-decoration:none;">Support</span></a></multiline></td>
                                                                            </tr>
                                                                            
																		</table>
                                                                        
																	</td>
																</tr> -->
                                                                
																<!-- END Button -->
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</layout>	
								<!-- END Article / Title + Copy + Button -->

							<!-- Footer -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="padding-bottom: 30px;">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="https://www.facebook.com/aljazriacademy/" target="_blank"><img src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38" height="38" editable="true" border="0" alt="" /></a></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="text-footer1 pb10" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>Elgendy Autotronics Center</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;"><multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya, Giza Governorate 11511</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30"
													style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
													<a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Footer -->
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

    `},receipt(e){return`
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
    <title>Email Template</title>
    <!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->


    <style type="text/css" media="screen">
        /* Linked Styles */
        body {
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            min-width: 100% !important;
            width: 100% !important;
            background: #f4f4f4;
            -webkit-text-size-adjust: none;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100%;
            line-height: 1.6em;
        }

        a {
            color: #66c7ff;
            text-decoration: none
        }

        p {
            padding: 0 !important;
            margin: 0 !important
        }

        img {
            -ms-interpolation-mode: bicubic;
            /* Allow smoother rendering of resized image in Internet Explorer */
        }

        .mcnPreviewText {
            display: none !important;
        }

        .hero_bg {
            background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
            margin: 0;
            padding: 0;
        }
        

        @media only screen and (max-width: 640px) {
            body {
                padding: 0 !important;
            }

            h1 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h2 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h3 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h4 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h1 {
                font-size: 22px !important;
            }

            h2 {
                font-size: 18px !important;
            }

            h3 {
                font-size: 16px !important;
            }

            .container {
                padding: 0 !important;
                width: 100% !important;
            }

            .content {
                padding: 0 !important;
            }

            .content-wrap {
                padding: 10px !important;
            }

            .invoice {
                width: 100% !important;
            }
        }


        /* Mobile styles */
        @media only screen and (max-device-width: 480px),
        only screen and (max-width: 480px) {
            .mobile-shell {
                width: 100% !important;
                min-width: 100% !important;
            }

            .bg {
                background-size: 100% auto !important;
                -webkit-background-size: 100% auto !important;
            }

            .text-header,
            .m-center {
                text-align: center !important;
            }

            .center {
                margin: 0 auto !important;
            }

            .container {
                padding: 20px 10px !important
            }

            .td {
                width: 100% !important;
                min-width: 100% !important;
            }

            .m-br-15 {
                height: 15px !important;
            }

            .p30-15 {
                padding: 30px 15px !important;
            }

            .p40 {
                padding: 20px !important;
            }

            .m-td,
            .m-hide {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                font-size: 0 !important;
                line-height: 0 !important;
                min-height: 0 !important;
            }

            .m-block {
                display: block !important;
            }

            .fluid-img img {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
            }

            .column,
            .column-top,
            .column-empty,
            .column-empty2,
            .column-dir-top {
                float: left !important;
                width: 100% !important;
                display: block !important;
            }

            .column-empty {
                padding-bottom: 10px !important;
            }

            .column-empty2 {
                padding-bottom: 20px !important;
            }

            .content-spacing {
                width: 15px !important;
            }
        }
    </style>
</head>

<body class="body"
    style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
        <tr>
            <td align="center" valign="top">
                <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                    <tr>
                        <td class="td container"
                            style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
                            <!-- Header -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="p30-15" style="padding: 25px 30px 25px 30px;"
                                                    bgcolor="#ffffff">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <th class="column-top" width="145"
                                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                <table width="100%" border="0" cellspacing="0"
                                                                    cellpadding="0">
                                                                    <tr>
                                                                        <td class="img m-center"
                                                                            style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                            <img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167"
                                                                                height="75" editable="true" border="0"
                                                                                alt="" /></td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                            <th class="column-empty" width="1"
                                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                            </th>
                                                            <th class="column"
                                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                <table width="100%" border="0" cellspacing="0"
                                                                    cellpadding="0">
                                                                    <tr>
                                                                        <td class="text-header"
                                                                            style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;">
                                                                            <multiline>
                                                                                <webversion class="link2"
                                                                                    style="color:#000; font-weight: 900; text-decoration:none;">
                                                                                    ORDER RECEIPT</webversion>
                                                                            </multiline>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!-- END Header -->

                            <repeater>
                                <!-- Article / Title + Copy + Button -->
                                <layout label='Article / Title + Copy + Button'>
                                    <table class="body-wrap"
                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;"
                                        bgcolor="#f6f6f6">
                                        <tr
                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
                                                valign="top"></td>
                                            <td class="container" width="600"
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;"
                                                valign="top">
                                                <div class="content"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                                                    <table class="main" width="100%" cellpadding="0" cellspacing="0"
                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;"
                                                        bgcolor="#fff">
                                                        <tr
                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                            <td class="content-wrap aligncenter"
                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 20px;"
                                                                align="center" valign="top">
                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                    <tr
                                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                        <td class="content-block"
                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                                            valign="top">
                                                                            <h1 class="aligncenter"
                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 32px; color: #000; line-height: 1.2em; font-weight: 500; text-align: center; margin: 40px 0 0;"
                                                                                align="center">$${e.totalPrice} Paid</h1>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                        <td class="content-block"
                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                                            valign="top">
                                                                            <h2 class="aligncenter"
                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 24px; color: #000; line-height: 1.2em; font-weight: 400; text-align: center; margin: 40px 0 0;"
                                                                                align="center">Thanks for using El Gendy
                                                                                Autotronices Center</h2>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                        <td class="content-block aligncenter"
                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;"
                                                                            align="center" valign="top">
                                                                            <table class="invoice"
                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; text-align: left; width: 80%; margin: 40px auto;">
                                                                                <tr
                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                                    <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 15px 0;"
                                                                                        valign="top">ORDER NO: ${e.orderId}</td>
                                                                                    </td> 
                                                                                </tr>
                                                                                <tr
                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                                    <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 10px 0;"
                                                                                        valign="top">
                                                                                        <table class="invoice-items"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; margin: 0;">
                                                                                            
                                                                                            ${e.items.map(t=>`<tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 1rem 0;">
                                                                                                        <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; padding: 15px 0;"
                                                                                                            valign="top">${t.name}
                                                                                                        </td>
                                                                                                        <td class="alignright"
                                                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 15px 0;"
                                                                                                            align="right"
                                                                                                            valign="top">$ ${t.price}
                                                                                                        </td>
                                                                                                    </tr>`)}
                                                                                            
                                                                                            

                                                                                            <tr class="total"
                                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                                                <td class="alignright"
                                                                                                    width="80%"
                                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 10px 0;"
                                                                                                    align="right"
                                                                                                    valign="top">Total
                                                                                                </td>
                                                                                                <td class="alignright"
                                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 10px 0;"
                                                                                                    align="right"
                                                                                                    valign="top">$ ${e.totalPrice}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
                                                valign="top"></td>
                                        </tr>
                                    </table>
                                </layout>
                                <!-- END Article / Title + Copy + Button -->

                                <!-- Footer -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="padding-bottom: 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="img" width="55"
                                                                    style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                    <a href="https://www.facebook.com/aljazriacademy/"
                                                                        target="_blank"><img
                                                                            src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38"
                                                                            height="38" editable="true" border="0"
                                                                            alt="" /></a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-footer1 pb10"
                                                        style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">
                                                        <multiline>Elgendy Autotronics Center</multiline>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-footer2 pb30"
                                                        style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
                                                        <multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya,
                                                            Giza Governorate 11511</multiline>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-footer2 pb30"
                                                        style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
                                                        <a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- END Footer -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `}},Pe=Mn;var wt=h(require("dotenv"),1),bt=h(require("path"),1);var A=process.cwd();wt.default.config({path:bt.default.join(A,".env")});var Vn=new yt.Resend(process.env.RESEND_API_KEY),Jn=async(e,t)=>{let n=e.html?e.html:Pe[t](e.info);e.html=n,delete e.info;let{data:s,error:r}=await Vn.emails.send(e);r?console.log(r):console.log("Email Send =>",s)},$e=Jn;var Ke=h(require("jsonwebtoken"),1),je=h(require("bcrypt"),1),vt=require("google-auth-library"),At=h(require("node-fetch"),1),It=h(require("crypto"),1);var _t=process.env.GOOGLE_CLIENT_ID,Et=async(e,t,n)=>{let{email:s}=e.body,r=new E(e.body),{lang:o}=e.headers;try{if(!s)throw t.status(401),new Error(d.user[o].require_email);if(await E.findOne({email:s}))throw t.status(401),new Error(d.user[o].email_exist);let i=await r.save();await Ze(i,e,"activate"),t.status(201).send({success:!0,code:201,user:i._id,message:d.user[o].create_account})}catch(a){n(a)}},St=async(e,t,n)=>{let{email:s,password:r}=e.body,{lang:o}=e.headers;try{if(!s)throw t.status(400),new Error(d.user[o].require_email);if(!r)throw t.status(400),new Error(d.user[o].require_pass);let a=await E.AuthUser(s,r,t,o),i=a.generateToken();t.cookie("token",i,{httpOnly:!0,maxAge:1e3*60*60*24*7}),t.json({success:!0,code:200,user:a,expiryAt:Re(7)})}catch(a){n(a)}},Nt=async(e,t,n)=>{let{email:s,password:r}=e.body;try{if(!s)throw t.status(400),new Error("Please, Provide Your E-mail Address");if(!r)throw t.status(400),new Error("Please, Provide Your Password");let o=await E.AuthUser(s,r,t,"en");if(!o.isAdmin)throw t.status(401),new Error("invalid login or password");let a=o.generateToken("1d");t.cookie("tokenAd",a,{httpOnly:!0,maxAge:1e3*60*60*24*1,secure:process.env.NODE_ENV!=="development"}),t.json({success:!0,code:200,id:o._id,expiryAt:Re(1)})}catch(o){n(o)}},kt=async(e,t,n)=>{try{t.clearCookie("tokenAd"),t.json({success:!0,code:200})}catch(s){n(s)}},Ct=async(e,t,n)=>{try{t.clearCookie("token"),t.json({success:!0,code:200})}catch(s){n(s)}},Pt=async(e,t,n)=>{let s=e.body,r=e.user,{lang:o}=e.headers;try{let a=["firstName","lastName","email","phoneNumber","isEmailVerified","isPhoneVerified","shippingAddress"];if(Object.keys(s).length<1)throw t.status(400),new Error(d.user[o].require_data);for(let i in s)if(a.includes(i))if(i==="shippingAddress"){let c=s.shippingAddress;for(let l in c)r.shippingAddress[l]=c[l]}else if(s[i])r[i]=s[i];else throw t.status(400),new Error(`please provide a value for ${i}`);else throw t.status(400),new Error(`${i} is Unknown, please choose a verified key`);await r.save(),t.json({success:!0,code:200,message:d.user[o].account_update,user:r})}catch(a){n(a)}},Oe=async(e,t,n)=>{let{oldPass:s,newPass:r}=e.body,{lang:o}=e.headers;try{let a=await E.findOne({email:e.user.email});if(a.password&&!s)throw t.status(400),new Error(d.user[o].old_pass_isValid);if(!r)throw t.status(400),new Error(d.user[o].pass_isValid);if(a.password){if(!await je.default.compare(s,a.password))throw t.status(400),new Error(d.user[o].old_pass_isValid);a.password=r}else a.password=r;await a.save(),t.json({success:!0,code:200,message:d.user[o].pass_update})}catch(a){n(a)}},$t=async(e,t,n)=>{try{t.json({success:!0,code:200,user:e.user})}catch(s){n(s)}},jt=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{let o=await E.findById(s);if(!o)throw t.status(404),new Error(d.user[r].no_user);t.json({success:!0,code:200,user:o})}catch(o){n(o)}},Ot=async(e,t,n)=>{let{name:s,page:r,skip:o}=e.query,{lang:a}=e.headers,i={isAdmin:{$ne:!0}};try{s&&(i={...i,firstName:{$regex:s,$options:"i"}});let c=await E.count({...i}),l=await E.find({...i}).limit(parseInt(r)||10).skip(parseInt(o)||0);if(!l||l.length<1)throw t.status(404),new Error(d.user[a].no_user);t.json({success:!0,code:200,users:l,count:c})}catch(c){n(c)}},Rt=async(e,t,n)=>{try{let s=null,r=e.body.token,o=await Yn(r),a=await E.findOne({email:o.email});a?s=a:s=await new E(o).save();let i=s.generateToken();t.cookie("token",i,{httpOnly:!0,maxAge:1e3*60*60*24*7}),t.json({success:!0,code:200,expiryAt:Re(7),user:s})}catch(s){n(s)}},Dt=async(e,t,n)=>{let{token:s}=e.body;try{let r=null,o=await Gn(s),a=await E.findOne({email:o.email});a?r=a:r=await new E(o).save();let i=r.generateToken();t.cookie("token",i,{httpOnly:!0,maxAge:1e3*60*60*24*7}),t.json({success:!0,code:200,expiryAt:Re(7),user:r})}catch(r){n(r)}},Tt=async(e,t,n)=>{let{lang:s}=e.headers;try{await e.user.remove();let r=await k.findById(e.user._id);if(r){await r.remove();let o=await S.find({instructor:r._id});if(o.length)for(let a of o)a.instructor=null,await a.save()}t.json({success:!0,code:200,message:d.user[s].account_delete,user:e.user._id})}catch(r){n(r)}},Bt=async(e,t,n)=>{let{id:s}=e.params;try{let r=await E.findById(s);if(!r)throw t.status(404),new Error("No User Found");await r.remove();let o=await k.findById(r._id);if(o){await o.remove();let a=await S.find({instructor:o._id});if(a.length)for(let i of a)i.instructor=null,await i.save()}t.json({success:!0,code:200,message:"user has been removed"})}catch(r){n(r)}},zt=async(e,t,n)=>{let{lang:s}=e.headers,{email:r}=e.body;try{let o=await E.findOne({email:r});if(!o)throw new Error(d.user[s].no_email_account);await Ze(o,e,"activate"),t.send({success:!0,code:200,message:d.user[s].link_sent})}catch(o){n(o)}},Ft=async(e,t,n)=>{let{email:s}=e.body,{lang:r}=e.headers;try{let o=await E.findOne({email:s});if(!o)throw new Error(d.user[r].no_email_account);await Ze(o,e,"reset"),t.send({success:!0,code:200,message:d.user[r].link_sent})}catch(o){n(o)}},Lt=async(e,t,n)=>{let{token:s,type:r,password:o}=e.body,{lang:a}=e.headers;try{let i=Ke.default.verify(s,process.env.RESET_TOKEN,(f,m)=>{if(f)throw new Error(d.user[a].invalid_link);return m}),c=await E.findOne({_id:i.id});if(!c)throw new Error(d.user[a].no_email_account);if(!await je.default.compare(i.code,c.AuthString))throw new Error(d.user[a].invalid_link);r==="activate"?(c.isEmailVerified=!0,await c.save(),t.json({success:!0,code:200,message:d.user[a].email_verified})):r==="reset"&&(c.password=o,await c.save(),t.json({success:!0,code:200,message:d.user[a].pass_reset_done}))}catch(i){n(i)}},Ut=async(e,t,n)=>{try{let s=await O.find({user:e.user._id},{course:1}).populate("course","name driveFile"),r=await z.find({user:e.user._id},{orderItems:1}).populate({path:"orderItems",populate:{path:"product",select:"name driveFile"}}),o=[];for(let i of s)i.course.driveFile.length&&o.push({_id:i.course._id,name:i.course.name,links:i.course.driveFile,type:"course"});let a=[];for(let i of r)for(let c of i.orderItems)c.product.driveFile.length&&a.push({_id:It.default.randomBytes(16).toString("hex"),name:c.product.name,links:c.product.driveFile,type:"product"});t.send({code:200,success:!0,links:[...o,...a]})}catch(s){n(s)}},Ht=async(e,t,n)=>{let{keyword:s}=e.query;try{let r=[],o=await S.find({isPublished:!0,$or:[{name:new RegExp(s,"i")},{description:new RegExp(s,"i")}]},{name:1,description:1,_id:1});for(let c of o)r.push({_id:c._id,title:c.name,description:c.description,type:"course"});let a=await N.find({isListed:!0,$or:[{name:new RegExp(s,"i")},{description:new RegExp(s,"i")}]},{name:1,description:1,_id:1});for(let c of a)r.push({_id:c._id,title:c.name,description:c.description,type:"product"});let i=await j.find({$or:[{title:new RegExp(s,"i")},{body:new RegExp(s,"i")}]},{title:1,body:1,_id:1});for(let c of i)r.push({_id:c._id,title:c.title,description:c.body,type:"blog"});t.send({code:200,success:!0,result:r})}catch(r){n(r)}},Ze=async(e,t,n)=>{try{let s=xt.default.generate(),r=Ke.default.sign({id:e._id.toString(),code:s},process.env.RESET_TOKEN,{expiresIn:"1 day"}),o=await je.default.hash(s,10);e.AuthString=o,await e.save();let i={link:`${process.env.APP_URL}/${n}?TOKEN=${r}`,name:e.firstName,email:e.email},c={to:[e.email],from:"noreplay@gendyecu.com",subject:n==="reset"?"Reset your password":"Activate your account",info:i};await $e(c,n)}catch(s){throw new Error(s)}};async function Gn(e){let n=await(await(0,At.default)(`https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${e}`)).json();return{firstName:n.first_name,lastName:n.last_name,email:n.email,avatar:n.picture.data.url,loggedBy:"facebook"}}async function Yn(e){let s=(await new vt.OAuth2Client(_t).verifyIdToken({idToken:e,audience:_t})).getPayload();return{email:s.email,firstName:s.given_name,lastName:s.family_name,avatar:s.picture,isEmailVerified:!0,loggedBy:"google"}}function Re(e){let t=new Date;return new Date(t).setDate(t.getDate()+e)}var $=Mt.default.Router();$.post("/new",Et);$.post("/login",St);$.post("/login/google",Rt);$.post("/login/facebook",Dt);$.post("/login/admin",Nt);$.post("/logout",p,Ct);$.post("/logout/admin",p,u,kt);$.patch("/",p,Pt);$.patch("/credential",p,Oe);$.delete("/",p,Tt);$.delete("/:id",p,u,Bt);$.get("/search",Ht);$.get("/me",p,$t);$.get("/links",p,Ut);$.get("/:id",p,u,jt);$.get("/",p,u,Ot);$.post("/email-link-activation",zt);$.post("/reset-password-link",Ft);$.patch("/verify-auth-link",Lt);var Vt=$;var po=h(require("express"),1);var _e=h(require("multer"),1),Xe=h(require("path"),1);var Wn=Xe.default.join(A,"src/uploads"),Jt=_e.default.diskStorage({destination(e,t,n){n(null,Wn)},filename(e,t,n){let s=`${t.fieldname}-${Date.now()}-${Xe.default.extname(t.originalname)}`;e.fileName=s,n(null,s)}}),C=(0,_e.default)({storage:Jt,limits:{fileSize:5e6},fileFilter(e,t,n){t.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG|webp|WEBP|pdf|PDF)$/)||n(new Error(d.product[e.headers.lang].image_upload_formats)),n(void 0,!0)}}),Gt=(0,_e.default)({storage:Jt,limits:{fileSize:1e7},fileFilter(e,t,n){t.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)||n(new Error(d.product[e.headers.lang].image_upload_formats)),n(void 0,!0)}}),Yt=(0,_e.default)({limits:{fileSize:3*1024*1024},fileFilter(e,t,n){t.originalname.match(/\.(rar|RAR|zip|ZIP|tar|TAR|gz|GZ|7z|7Z)$/)||n(new Error("please upload the following extension (RAR | ZIP | TAR | GZ | 7Z)")),n(void 0,!0)}});var Zt=h(require("fs"),1),Xt=h(require("path"),1);var xe=h(require("mongoose"),1),Kn=new xe.default.Schema({user:{type:xe.default.Schema.Types.ObjectId,required:!0},itemType:{type:String,required:[!0,"Please Provide the item type"]},item:{type:xe.default.Schema.Types.ObjectId,required:!0}},{timestamps:!0}),G=xe.default.model("Wishlist",Kn);var Wt=require("uuid"),Zn=e=>{let t=[],n=new Set;e.forEach(s=>n.add(s.type.toLocaleLowerCase()));for(let s of n){let r=e.filter(o=>o.type.toLocaleLowerCase()===s);t.push({_id:(0,Wt.v4)(),title:s,cards:r})}return t},Kt=Zn;var Qt=async(e,t,n)=>{let{lang:s}=e.headers,{options:r}=e.body,o=new N({...e.body,options:JSON.parse(r)});e.files&&(o.images=e.files.map(a=>({src:a.filename})));try{if(await N.findOne({name:e.body.name}))throw t.status(400),new Error(d.product[s].product_exist);let i=await o.save();t.status(201).json({success:!0,code:201,message:d.product[s].create_product,product:i})}catch(a){n(a)}},qt=async(e,t,n)=>{let{name:s,type:r,price:o,quantity:a,page:i,skip:c,isPublic:l,isMainPage:f}=e.query,{lang:m}=e.headers,g={};try{if(r&&(g={...g,type:{$regex:r.split("-").join(" "),$options:"i"}}),s&&(g={...g,name:{$regex:s,$options:"i"}}),o){let _=o.split("-");if(_.length>1){let P=parseInt(_[0]),I=parseInt(_[1]);g={...g,price:{$gte:P,$lte:I}}}else g={...g,price:parseInt(_[0])}}if(a){let _=a.split("-");if(_.length>1){let P=parseInt(_[0]),I=parseInt(_[1]);g={...g,quantity:{$gte:P,$lte:I}}}else g={...g,quantity:parseInt(_[0])}}l&&(g={...g,isListed:l==="true"});let y=await N.count({...g}),b=await N.find({...g}).limit(parseInt(i)||0).skip(parseInt(c)||0).sort({createdAt:-1});if(!b||b.length<1)throw t.status(404),new Error(d.product[m].no_product);let w=f?Kt(b):b;t.json({success:!0,code:200,count:y,products:w})}catch(y){n(y)}},Qe=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{let o=await N.findById(s);if(!o)throw t.status(404),new Error(d.product[r].no_product);let a=e.user?await G.findOne({item:s,user:e.user._id}):null,i={...o._doc,isFav:!!a};t.json({success:!0,code:200,product:i})}catch(o){n(o)}},eo=async(e,t,n)=>{let s=e.body,{lang:r}=e.headers,{id:o}=e.params;try{let a=await N.findById(o);if(!a)throw t.status(404),new Error(d.product[r].no_product);let i=["name","description","price","quantity","type","video","short","options","link"];if(Object.keys(s).length<1)throw t.status(400),new Error(d.user[r].require_data);for(let l in s)if(i.includes(l))if(s[l])l==="link"?a.driveFile=a.driveFile.concat(s[l]):a[l]=s[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);let c=await a.save();t.json({success:!0,code:200,message:d.product[r].product_update,product:c})}catch(a){n(a)}},to=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{if(!e.fileName)throw t.status(400),new Error(d.product[r].image_upload_require);let o=await N.findById(s);if(!o)throw t.status(404),new Error(d.product[r].no_product);o.image&&(o.images=o.images.concat({src:o.image}),o.image=void 0),o.images=o.images.concat({src:e.fileName});let i=(await o.save()).images.find(c=>c.src===e.fileName);t.json({success:!0,code:200,id:o._id,image:i,message:d.product[r].image_upload})}catch(o){n(o)}},oo=async(e,t,n)=>{let{id:s,imageId:r}=e.params,{lang:o}=e.headers;try{let a=await N.findById(s);if(!a)throw t.status(404),new Error(d.product[o].no_product);if(a.images.length<2)throw t.status(400),new Error(d.product[o].product_require_image);let i=a.images.find(c=>c._id.toString()===r);if(!i)throw t.status(404),new Error(d.product[o].no_image);Zt.default.unlink(Xt.default.resolve(`server/uploads/${i.image}`),async()=>{a.images=a.images.filter(c=>c._id.toString()!==r),await a.save(),t.json({success:!0,code:200,message:d.product[o].image_delete})})}catch(a){n(a)}},so=async(e,t,n)=>{let{id:s,link:r}=e.params;try{let o=await N.findById(s);if(!o)throw t.status(404),new Error(d.product[lang].no_product);o.driveFile=o.driveFile.filter(a=>a._id.toString()!==r),await o.save(),t.send({success:!0,code:200})}catch(o){n(o)}},ro=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{let o=await N.findById(s);if(!o)throw t.status(404),new Error(d.product[r].no_product);await o.remove(),t.json({success:!0,code:200,message:`${o.name} ${d.product[r].product_delete}`,product:o._id})}catch(o){n(o)}},no=async(e,t,n)=>{let{id:s}=e.params;try{let r=await N.findById(s);r.isListed=!r.isListed;let o=await r.save();t.send({success:!0,code:200,isListed:o.isListed})}catch(r){n(r)}};var ve=h(require("mongoose"),1),Xn=new ve.default.Schema({user:{type:ve.default.Schema.Types.ObjectId,required:!0,ref:"User"},item:{type:ve.default.Schema.Types.ObjectId,required:!0,ref:"Product"},quantity:{type:Number,default:1},options:[{question:String,option:String}]},{timestamps:!0}),se=ve.default.model("Cart",Xn);var ao=async(e,t,n)=>{let{lang:s}=e.headers,r=new se({user:e.user._id,...e.body});try{let o=await r.save(),a=await se.findById(o._id).populate("item","name price");t.status(201).json({success:!0,code:201,message:d.product[s].item_add,item:a})}catch(o){n(o)}},io=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await se.findById(r);if(!o)throw t.status(400),new Error(d.product[s].no_item);await o.remove(),t.json({success:!0,code:200,message:d.product[s].item_delete,item:o._id})}catch(o){n(o)}},co=async(e,t,n)=>{let{lang:s}=e.headers;try{let r=await se.find({user:e.user._id}).populate("item","name price");if(!r||r.length===0)throw t.status(400),new Error(d.product[s].cart_empty);t.json({success:!0,code:200,items:r})}catch(r){n(r)}},lo=async(e,t,n)=>{let{lang:s}=e.headers;try{await se.deleteMany({user:e.user._id}),t.json({success:!0,code:200,message:d.product[s].cart_clear})}catch(r){n(r)}};var F=new po.default.Router;F.get("/cart",p,co);F.post("/cart/new",p,ao);F.delete("/cart/:id",p,io);F.delete("/cart",p,lo);F.post("/new",p,u,C.array("images",12),Qt);F.get("/:id/public",Qe);F.get("/:id",p,Qe);F.get("/",qt);F.patch("/:id",p,u,eo);F.patch("/:id/listing",p,u,no);F.patch("/image/:id",p,u,C.single("image"),to);F.patch("/image/:id/:imageId",p,u,oo);F.delete("/:id",p,u,ro);F.delete("/:id/link/:link",p,u,so);var uo=F;var bo=h(require("express"),1);var mo=require("mongoose/lib/types/index.js"),fo=async(e,t,n)=>{let s=new z({user:e.user._id,shippingAddress:e.user.shippingAddress||{},...e.body});try{let r=await s.save(),o=await z.findById(r._id).populate({path:"orderItems",populate:{path:"product",select:"name price driveFile"}});t.status(201).json({success:!0,code:201,message:"New Order has Created Successfully",order:o})}catch(r){n(r)}},go=async(e,t,n)=>{let{lang:s}=e.headers;try{let r=null;if(e.user.isAdmin?r=await z.findById(e.params.id).populate("user","firstName lastName email"):r=await z.findOne({_id:e.params.id,user:e.user._id}).populate("user","firstName lastName email"),!r)throw t.status(404),new Error(d.product[s].no_order);t.json({success:!0,code:200,order:r})}catch(r){n(r)}},ho=async(e,t,n)=>{let{lang:s}=e.headers;try{let r=await z.find({user:e.user._id}).populate({path:"orderItems",populate:{path:"product",select:"name price images"}});if(!r||r.length===0)throw t.status(404),new Error(d.product[s].no_order);t.json({success:!0,code:200,orders:r})}catch(r){n(r)}},yo=async(e,t,n)=>{let{lang:s}=e.headers,{firstName:r,_id:o,createdAt:a,totalPrice:i,skip:c}=e.query;try{let l={};if(r&&(l={...l,"user.firstName":{$regex:r,$options:"i"}}),o&&(l={...l,_id:(0,mo.ObjectId)(o)}),a){let b=new Date(a);b.setDate(b.getDate()+1),l={...l,createdAt:{$gte:new Date(a),$lt:new Date(b)}}}if(i){let b=i.split("-");if(b.length>1){let w=parseInt(b[0]),_=parseInt(b[1]);l={...l,totalPrice:{$gte:w,$lte:_}}}else l={...l,totalPrice:parseInt(b[0])}}let f=[{$lookup:{from:"users",let:{userId:"$user"},pipeline:[{$match:{$expr:{$eq:["$_id","$$userId"]}}},{$project:{firstName:1,lastName:1,phoneNumber:1,email:1}}],as:"user"}},{$unwind:"$user"},{$unwind:"$orderItems"},{$lookup:{from:"products",let:{productId:"$orderItems.product"},pipeline:[{$match:{$expr:{$eq:["$_id","$$productId"]}}},{$project:{name:1,price:1,type:1,images:1}}],as:"product"}},{$set:{"orderItems.product":"$product"}},{$unwind:"$orderItems.product"},{$group:{_id:"$_id",user:{$first:"$user"},orderItems:{$push:"$orderItems"},shippingAddress:{$first:"$shippingAddress"},paymentMethod:{$first:"$paymentMethod"},paymentResult:{$first:"$paymentResult"},totalPrice:{$first:"$totalPrice"},isPaid:{$first:"$isPaid"},isDelivered:{$first:"$isDelivered"},createdAt:{$first:"$createdAt"},paidAt:{$first:"$paidAt"},deliveredAt:{$first:"$deliveredAt"}}},{$match:{...l}}],m=await z.aggregate([...f,{$sort:{createdAt:-1}},{$skip:c||0},{$limit:10}]);if(!m||m.length===0)throw t.status(404),new Error(d.product[s].no_order);let g=await z.aggregate([...f,{$count:"document_count"}]),y=0;g[0]&&(y=g[0].document_count),t.json({success:!0,code:200,orders:m,count:y})}catch(l){n(l)}},wo=async(e,t,n)=>{let s=e.body,{lang:r}=e.headers;try{let o=await z.findById(e.params.id);if(!o)throw t.status(404),new Error(d.product[r].no_order);let a=["shippingAddress","paymentResult","isPaid","isDelivery"];if(Object.keys(s).length<1)throw t.status(400),new Error(d.user[r].require_data);for(let i in s)if(a.includes(i))if(i==="isPaid")o[i]=s[i],o.isPaid&&(o.paidAt=new Date);else if(i==="isDelivery")o[i]=s[i],o.isDelivery&&(o.deliveryAt=new Date);else if(s[i])o[i]=s[i];else throw t.status(400),new Error(`please provide a value for ${i}`);else throw t.status(400),new Error(`${i} is Unknown, please choose a verified key`);await o.save(),t.json({success:!0,code:200,message:d.product[r].order_update,order:o._id})}catch(o){n(o)}};var re=new bo.default.Router;re.post("/new",p,fo);re.get("/all",p,u,yo);re.get("/:id",p,go);re.get("/",p,ho);re.patch("/:id",p,wo);var _o=re;var rs=h(require("express"),1);var xo=h(require("fs"),1),vo=h(require("path"),1);var De=h(require("mongoose"),1),Qn=new De.default.Schema({course:{type:De.default.Schema.Types.ObjectId,required:!0},title:{type:String,required:[!0,"Chapter title is Required"]},order:{type:Number,required:!0},isPaid:{type:Boolean,default:!1}},{timestamps:!0}),R=De.default.model("Chapter",Qn);var Te=h(require("mongoose"),1),qn=new Te.default.Schema({chapter:{type:Te.default.Schema.Types.ObjectId,ref:"Chapter",required:!0},title:{type:String,required:[!0,"Lesson title is required"]},description:{type:String},video:{type:String},duration:{type:Number},document:{type:String},isPaid:{type:Boolean,default:!1},order:{type:Number,required:!0}},{timestamps:!0}),D=Te.default.model("Lesson",qn);var Ae=h(require("mongoose"),1),ea=new Ae.default.Schema({rating:{type:Number,required:!0,default:0},comment:{type:String},course:{type:Ae.default.Schema.Types.ObjectId,required:!0,ref:"Course"},user:{type:Ae.default.Schema.Types.ObjectId,required:!0,ref:"User"}},{timestamps:!0}),W=Ae.default.model("Review",ea);var Ao=async(e,t,n)=>{let{lang:s}=e.headers;try{let r=JSON.parse(e.body.course),o=JSON.parse(e.body.chapters),a=JSON.parse(e.body.lessons),c=await new S({...r,image:e.fileName}).save();await R.insertMany(o),await D.insertMany(a),t.status(201).json({success:!0,code:201,message:d.course[s].course_create,course:c._id})}catch(r){n(r)}},qe=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{type:o}=e.query;try{let a=await S.findById(r);if(!a)throw t.status(404),new Error(d.course[s].no_course);a.original_Price=a.price,a.discount&&(a.price=a.price-a.price*a.discount/100);let i=await k.findById(a.instructor).populate("info","firstName lastName").populate({path:"reviews",populate:{path:"user",select:"firstName lastName"}}),c=await ta(i),l=await R.find({course:r});if(!l||l.length<1)throw t.status(400),new Error(d.course[s].no_course_chapters);let f=await tt(l),m=0;f.forEach(P=>m+=P.duration);let g=await W.find({course:r}).populate("user","firstName lastName"),y=oa(g),b=await O.count({course:r}),w=e.user?await O.findOne({course:r,user:e.user._id}):null,_=e.user?await G.findOne({itemType:"course",item:r}):null;o==="preview"?t.json({success:!0,code:200,course:{_id:a._id,name:a.name,description:a.description,price:a.price,original_Price:a.original_Price,image:a.image,isFav:!!_,discount:a.discount||0}}):t.json({success:!0,code:200,course:{...a._doc,updatedAt:a.updatedAt,duration:m,students:b,instructor:c,chapters:f,original_Price:a.original_Price,isFav:!!_,enrollment:{_id:w?w._id:null,isEnrolled:!!w,enrollmentDate:w?w.createdAt:null},reviewsData:y}})}catch(a){n(a)}},et=async(e,t,n)=>{let{lang:s}=e.headers;console.log("list all courses");let{name:r,price:o,rating:a,students:i,isPaid:c,page:l,skip:f,isPublished:m,isPublic:g}=e.query,y={};try{if(r&&(y={name:{$regex:r,$options:"i"}}),o){let I=o.split(":");if(I.length>1){let J=parseInt(I[0]),we=parseInt(I[1]);y={...y,price:{$gte:J,$lte:we}}}else y={...y,price:parseInt(I[0])}}if(a&&(y={...y,rating:{$lte:parseFloat(a),$gte:parseFloat(a)-.25}}),i){let I=i.split(":");if(I.length>1){let J=parseInt(I[0]),we=parseInt(I[1]);y={...y,students:{$gte:J,$lte:we}}}else y={...y,students:parseInt(I[0])}}c&&(y={...y,isPaid:c==="true"}),(m||g)&&(y={...y,isPublished:(m||g)==="true"});let b=[{$lookup:{from:"reviews",let:{courseId:"$_id"},pipeline:[{$match:{$expr:{$eq:["$course","$$courseId"]}}},{$project:{rating:1,comment:1,user:1}}],as:"reviews"}},{$lookup:{from:"enrollments",let:{courseId:"$_id"},pipeline:[{$match:{$expr:{$eq:["$course","$$courseId"]}}},{$project:{progress:1}}],as:"students"}},{$group:{_id:"$_id",name:{$first:"$name"},image:{$first:"$image"},description:{$first:"$description"},price:{$first:"$price"},discount:{$first:"$discount"},students:{$first:"$students"},isPaid:{$first:"$isPaid"},createdAt:{$first:"$createdAt"},updatedAt:{$first:"$updatedAt"},isPublished:{$first:"$isPublished"},numReviews:{$last:{$map:{input:"$reviews",as:"r",in:"$$r.rating"}}}}},{$project:{name:1,image:1,description:1,price:1,isPaid:1,discount:1,createdAt:1,updatedAt:1,isPublished:1,rating:{$ifNull:[{$avg:"$numReviews"},0]},students:{$size:"$students"}}},{$match:y}],w=await S.aggregate([...b,{$sort:{createdAt:-1}},{$skip:parseInt(f)||0},{$limit:parseInt(l)||10}]);if(!w||w.length<1)throw t.status(404),new Error(d.course[s].no_course);let _=await S.aggregate([...b,{$count:"course_count"}]),P=0;_&&(P=_[0].course_count);for(let I of w){let J=0,we=await R.find({course:I._id});(await tt(we)).forEach(Nn=>J+=Nn.duration),I.time=J,await G.findOne({user:e.user?._id,item:I._id})?I.isFav=!0:I.isFav=!1}t.json({success:!0,code:200,courses:w,count:P})}catch(b){n(b)}},Io=async(e,t,n)=>{let{lang:s}=e.headers;try{let r=await O.find({user:e.user._id});if(!r||!r.length)throw t.status(400),new Error(d.course[s].not_enrolled);let o=[];for(let a of r){let i=await S.findById(a.course),c=await R.find({course:i._id}),l=await tt(c),f=0;l.forEach(m=>f+=m.duration),o.push({_id:i._id,enroll:a._id,name:i.name,image:i.image,time:f,isPaid:i.isPaid})}t.json({success:!0,code:200,courses:o})}catch(r){n(r)}},Eo=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=await S.findById(o);if(!a)throw t.status(404),new Error(d.course[s].no_course);let i=["name","description","price","language","instructor","points","requirements","targets","isPaid","trailer","discount","link"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.user[s].require_data);for(let l in r)if(i.includes(l))if(l==="isPaid")a.isPaid=r.isPaid;else if(l==="price")a.price=r.price;else if(l==="link")a.driveFile=a.driveFile.concat(r[l]);else if(r[l])a[l]=r[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);let c=await a.save();t.json({success:!0,code:200,message:d.course[s].course_update,course:c})}catch(a){n(a)}},So=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{if(!e.fileName)throw t.status(400),new Error(d.product[s].image_upload_require);let o=await S.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_course);xo.default.unlink(vo.default.resolve(`server/uploads/${o.image}`),async()=>{o.image=e.fileName,await o.save(),t.json({success:!0,code:200,image:e.fileName,message:d.product[s].image_upload})})}catch(o){n(o)}},No=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await S.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_course);let a=await R.find({course:o._id});if(a.length>0){for(let i of a)await D.deleteMany({chapter:i._id});await R.deleteMany({course:o._id})}await o.remove(),t.json({success:!0,code:200,message:d.course[s].course_delete,course:o._id})}catch(o){n(o)}},ko=async(e,t,n)=>{let{id:s}=e.params;try{let r=await S.findById(s);r.isPublished=!r.isPublished;let o=await r.save();t.send({success:!0,isPublished:o.isPublished})}catch(r){n(r)}},Co=async(e,t,n)=>{let{id:s,link:r}=e.params;try{let o=await S.findById(s);if(!o)throw t.status(404),new Error(d.course[lang].no_course);o.driveFile=o.driveFile.filter(a=>a._id.toString()!==r),await o.save(),t.send({success:!0,code:200,message:"Link has Removed"})}catch(o){n(o)}};async function ta(e){let t=await S.find({instructor:e._id}),n=0;for(let i of t){let c=await O.count({course:i._id});n+=c}let s=e.reviews.length,r=0;e.reviews.forEach(i=>r+=i.rating);let o=r/s,a=e.reviews.map(i=>({_id:i._id,name:`${i.user.firstName} ${i.user.lastName}`,comment:i.body,rating:i.rating,createdAt:i.createdAt}));return{_id:e._id,name:`${e.info.firstName} ${e.info.lastName}`,role:e.role,about:e.about,avatar:e.avatar,coursesNumber:t.length,studentsNumber:n,reviewsNumber:s,averageRating:o,reviews:a}}async function tt(e){let t=[];for(let n of e){let s=await D.find({chapter:n}),r=0;s.forEach(a=>r+=a.duration);let o=s.map(a=>({_id:a._id,title:a.title,description:a.description,video:a.video,isPaid:a.isPaid,duration:a.duration,order:a.order}));t.push({_id:n._id,title:n.title,order:n.order,isPaid:n.isPaid,lessonCount:s.length,duration:r,lessons:o})}return t}function oa(e){let t=e.map(w=>({_id:w._id,title:w.title,rating:w.rating,comment:w.comment,name:`${w.user.firstName} ${w.user.lastName}`,createdAt:w.createdAt})),n=e.length,s=0,r=0,o=0,a=0,i=0,c=0;e.forEach(w=>{s+=w.rating,w.rating<=1&&(r+=1),w.rating>1&&w.rating<=2&&(o+=1),w.rating>2&&w.rating<=3&&(a+=1),w.rating>3&&w.rating<=4&&(i+=1),w.rating>4&&w.rating<=5&&(c+=1)});let l=isNaN(s/n)?"0.0":(s/n).toFixed(1),f=Math.floor(r*100/n)||0,m=Math.floor(o*100/n)||0,g=Math.floor(a*100/n)||0,y=Math.floor(i*100/n)||0,b=Math.floor(c*100/n)||0;return{numberOfReview:n,averageNumericRating:l,ratingValues:[b,y,g,m,f],reviews:t.filter(w=>!!w.comment)}}var Po=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{title:o}=e.body,a=new R({...e.body,course:r});try{if(await R.findOne({course:r,title:o}))throw t.status(400),new Error(d.course[s].chapter_title_exist);let c=await a.save();t.status(201).json({success:!0,code:201,chapter:c,message:d.course[s].chapter_create})}catch(i){n(i)}},$o=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await R.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_chapters);let a=await D.find({chapter:o._id}),i={...o._doc,lessons:a};t.json({success:!0,code:200,chapter:i})}catch(o){n(o)}},jo=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await R.find({course:r});if(!o||o.length<1)throw t.status(404),new Error(d.course[s].no_course_chapters);let a=await Promise.all(o.map(async i=>{let c=await D.find({chapter:i._id});return{...i._doc,lessons:c}}));t.json({success:!0,code:200,chapters:a})}catch(o){n(o)}},Oo=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=await R.findById(o);if(!a)throw t.status(404),new Error(d.course[s].no_chapters);let i=["title","isPaid"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.user[s].require_data);for(let l in r)if(i.includes(l))if(l==="isPaid")a.isPaid=r.isPaid;else if(r[l])a[l]=r[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);let c=await a.save();t.json({success:!0,code:200,message:d.course[s].chapter_update,chapter:{title:c.title,isPaid:c.isPaid}})}catch(a){n(a)}},Ro=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await R.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_chapters);await D.deleteMany({chapter:r}),await o.remove(),t.json({success:!0,code:200,message:d.course[s].chapter_delete,chapter:o._id})}catch(o){n(o)}};var Do=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{title:o}=e.body,a=new D({...e.body,chapter:r});try{if(await D.findOne({chapter:r,title:o}))throw t.status(400),new Error(d.course[s].lesson_title_exist);let c=await a.save();t.status(201).json({success:!0,code:201,lesson:c,message:d.course[s].lesson_create})}catch(i){n(i)}},To=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=await D.findById(o);if(!a)throw t.status(404),new Error(d.course[s].no_lesson);let i=["title","description","video","document","isPaid","duration"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.course[s].require_data);for(let l in r)if(i.includes(l))if(l==="isPaid")a.isPaid=r.isPaid;else if(r[l])a[l]=r[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);let c=await a.save();t.json({success:!0,code:200,message:d.course[s].lesson_update,lesson:c})}catch(a){n(a)}},Bo=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await D.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_lesson);await o.remove(),t.json({success:!0,code:200,message:d.course[s].lesson_delete,lesson:o._id})}catch(o){n(o)}};var zo=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{user:o,payment:a}=e.body,i=o||e.user._id,c=new O({user:i,course:r,payment:a?parseFloat(a):0});try{if(await O.findOne({course:r,user:i}))throw t.status(400),new Error(d.course[s].already_enrolled);let f=await S.findById(r),m=await R.findOne({course:r,order:0}),g=m?await D.findOne({chapter:m._id,order:0}):void 0;c.currentLesson=g?g._id:void 0,c.completedLesson=g?c.completedLesson.concat(g._id):[];let y=await c.save();if(f.isPaid){t.status(201).json({success:!0,code:201,isCompleted:!0,message:d.course[s].new_enroll});return}t.status(201).json({success:!0,code:201,message:d.course[s].new_enroll,enroll:y._id})}catch(l){n(l)}},Fo=async(e,t,n)=>{let{lang:s}=e.headers,{enroll:r}=e.params;try{let o=await O.findById(r).populate("currentLesson");if(!o)throw t.status(400),new Error(d.course[s].no_enroll);t.json({success:!0,code:200,enrollment:o})}catch(o){n(o)}},Lo=async(e,t,n)=>{let{lang:s}=e.headers,{id:r,enroll:o,chapter:a,lesson:i}=e.params;try{let c=await O.findById(o);if(!c)throw t.status(400),new Error(d.course[s].no_course_enroll);c.completedLesson.includes(i)||(c.completedLesson=c.completedLesson.concat(i)),c.currentLesson=i,(await D.find({chapter:a})).every(_=>c.completedLesson.includes(_._id))&&!c.completedChapters.includes(a)&&(c.completedChapters=c.completedChapters.concat(a));let m=await R.find({course:r});m.every(_=>c.completedChapters.includes(_._id))&&(c.isCourseCompleted=!0);let y=0;for(let _ of m){let P=await D.count({chapter:_});y+=P}let b=c.completedLesson.length,w=Math.ceil(b*100/y);w>100&&(w=100),c.progress=w,await c.save(),t.json({success:!0,code:200,progress:c.progress,lesson:c.currentLesson})}catch(c){n(c)}},Uo=async(e,t,n)=>{let{lang:s}=e.headers,{id:r,enroll:o,chapter:a,lesson:i}=e.params;try{let c=await O.findById(o);if(!c)throw t.status(400),new Error(d.course[s].no_course_enroll);c.completedLesson.includes(i)&&(c.completedLesson=c.completedLesson.filter(g=>g.toString()!==i.toString())),c.completedChapters.includes(a)&&(c.completedChapters=c.completedChapters.filter(g=>g.toString()!==a.toString())),c.isCourseCompleted&&(c.isCourseCompleted=!1);let l=0,f=await R.find({course:r});for(let g of f){let y=await D.count({chapter:g});l+=y}let m=Math.ceil(c.progress-1*100/l);c.progress=m,await c.save(),t.json({success:!0,code:200,progress:c.progress})}catch(c){n(c)}},Ho=async(e,t,n)=>{let{id:s}=e.params;try{let r=await O.find({course:s}).populate("user","firstName lastName email phoneNumber").select("user createdAt");t.send({success:!0,code:200,enrollments:r})}catch(r){n(r)}};var ne=h(require("mongoose"),1),sa=new ne.default.Schema({user:{type:ne.default.Schema.Types.ObjectId,required:!0},course:{type:ne.default.Schema.Types.ObjectId,ref:"Course",required:!0},lesson:{type:ne.default.Schema.Types.ObjectId,ref:"Lesson",required:!0},note:{type:String,required:!0},time:{type:Number,default:0}},{timestamps:!0}),ae=ne.default.model("Note",sa);var Mo=async(e,t,n)=>{let{id:s}=e.params,{lesson:r}=e.body,{lang:o}=e.headers,a=new ae({...e.body,course:s,user:e.user._id});try{if(!r)throw t.status(400),new Error(d.course[o].note_choose_lesson);let i=await a.save(),c=await ae.findById(i._id).populate("course","name").populate("lesson","title");t.status(201).json({success:!0,code:201,message:d.course[o].note_create,note:c})}catch(i){n(i)}},Vo=async(e,t,n)=>{let{id:s}=e.params,{note:r}=e.body,{lang:o}=e.headers;try{let a=await ae.findById(s);if(!a)throw t.status(404),new Error(d.course[o].no_note);a.note=r,await a.save(),t.json({success:!0,code:200,message:d.course[o].note_update,note:a})}catch(a){n(a)}},Jo=async(e,t,n)=>{let{id:s}=e.params,{lesson:r}=e.query,{lang:o}=e.headers;try{let a={course:s};r&&(a={course:s,lesson:r});let i=await ae.find({...a}).sort({createdAt:-1}).populate("course","name").populate("lesson","title");if(!i||i.length<1)throw t.status(404),new Error(d.course[o].not_notes);t.json({success:!0,code:200,notes:i})}catch(a){n(a)}},Go=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{let o=await ae.findById(s);if(!o)throw t.status(404),new Error(d.course[r].no_notes);await o.remove(),t.json({success:!0,code:200,message:d.course[r].note_delete,note:o._id})}catch(o){n(o)}};var Yo=h(require("fs"),1),Wo=h(require("path"),1);var ie=h(require("mongoose"),1),ra=new ie.default.Schema({course:{type:ie.default.Schema.Types.ObjectId,ref:"Course",required:!0},instructor:{type:ie.default.Schema.Types.ObjectId,ref:"User",required:!0},announcement:{type:String,required:!0},image:{type:String},comments:[{user:{type:ie.default.Schema.Types.ObjectId,ref:"User",required:!0},comment:{type:String,required:!0}}]},{timestamps:!0}),U=ie.default.model("Announcement",ra);var Ko=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{announcement:o}=e.body,a=new U({announcement:o,course:r,instructor:e.user._id,image:e.fileName});try{let i=await a.save();t.status(201).json({success:!0,code:201,message:d.course[s].ann_create,announcement:i._id})}catch(i){n(i)}},Zo=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{page:o,skip:a}=e.query;try{let i=await U.count({course:r}),c=await U.find({course:r}).populate({path:"instructor",select:"firstName lastName avatar"}).populate({path:"comments",populate:{path:"user",select:"firstName lastName avatar"}}).limit(parseInt(o)||5).skip(parseInt(a)||0);if(!c||c.length<1)throw t.status(404),new Error(d.course[s].no_ann);t.json({success:!0,code:200,announcements:c,count:i})}catch(i){n(i)}},Xo=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.params;try{let o=await U.findById(r).populate({path:"instructor",select:"firstName lastName avatar"}).populate({path:"comments",populate:{path:"user",select:"firstName lastName"}});if(!o)throw t.status(404),new Error(d.course[s].no_ann);t.json({success:!0,code:200,announcement:o})}catch(o){n(o)}},Qo=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.body,{id:o}=e.params;try{let a=await U.findById(o);if(!a)throw t.status(404),new Error(d.course[s].no_ann);a.announcement=r,await a.save(),t.json({success:!0,code:200,message:d.course[s].ann_update,announcement:a._id})}catch(a){n(a)}},qo=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.params;try{if(!e.fileName)throw t.status(400),new Error(d.product[s].image_upload_require);let o=await U.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_ann);Yo.default.unlink(Wo.default.resolve(`server/uploads/${o.image}`),async()=>{o.image=e.fileName,await o.save(),t.json({success:!0,code:200,message:d.product[s].image_upload})})}catch(o){n(o)}},es=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.params;try{let o=await U.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_ann);await o.remove(),t.json({success:!0,code:200,message:d.course[s].ann_delete,Announcement:o._id})}catch(o){n(o)}},ts=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.params,{comment:o}=e.body,a={user:e.user._id,comment:o};try{let i=await U.findById(r);if(!i)throw t.status(404),new Error(d.course[s].no_ann_comment);if(i.comments.find(l=>l.user.toString()===e.user._id.toString()))throw t.status(400),new Error(d.course[s].already_ann_comment);i.comments=i.comments.concat(a),await i.save(),t.status(201).json({success:!0,code:201,comment:a,message:d.course[s].add_ann_comment})}catch(i){n(i)}},os=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.params,{page:o,skip:a}=e.query;try{let i=await U.findById(r);if(!i)throw t.status(404),new Error(d.course[s].no_ann);if(!i.comments||i.comments.length<1)throw t.status(404),new Error(d.course[s].no_ann_comments_add);let c=i.comments.slice(parseInt(a),parseInt(o)+parseInt(a));if(c.length<1)throw t.status(404),new Error(d.course[s].end_ann_comments);t.json({success:!0,code:200,comments:c})}catch(i){n(i)}},ss=async(e,t,n)=>{let{lang:s}=e.headers,{announcement:r}=e.params;try{let o=await U.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_ann);let a=o.comments.find(i=>i.user.toString()===e.user._id.toString());if(!a)throw t.status(404),new Error(d.course[s].no_comments);o.comments=o.comments.filter(i=>i.user.toString()!==e.user._id.toString()),await o.save(),t.json({success:!0,code:200,message:d.course[s].comment_delete,comment:a._id})}catch(o){n(o)}};var x=new rs.default.Router;x.post("/new",p,u,C.single("image"),Ao);x.delete("/:id",p,u,No);x.patch("/:id",p,u,Eo);x.patch("/:id/publish",p,u,ko);x.patch("/:id/image",p,u,C.single("image"),So);x.get("/purchased",p,Io);x.get("/",p,et);x.get("/public",et);x.get("/:id",p,qe);x.get("/:id/public",qe);x.delete("/:id/link/:link",p,u,Co);x.post("/:id/chapters/new",p,u,Po);x.patch("/chapters/:id",p,u,Oo);x.get("/chapters/:id",p,u,$o);x.get("/:id/chapters",jo);x.delete("/chapters/:id",p,u,Ro);x.post("/chapters/:id/lessons/new",p,u,Do);x.patch("/chapters/lessons/:id",p,u,To);x.delete("/chapters/lessons/:id",p,u,Bo);x.post("/:id/enrollment/new",p,zo);x.get("/:id/enrollment/:enroll",p,Fo);x.get("/:id/enrollments",p,u,Ho);x.patch("/:id/enrollment/:enroll/chapters/:chapter/lessons/:lesson/add",p,Lo);x.patch("/:id/enrollment/:enroll/chapters/:chapter/lessons/:lesson/sub",p,Uo);x.post("/:id/notes/new",p,Mo);x.get("/:id/notes",p,Jo);x.patch("/:course/notes/:id",p,Vo);x.delete("/:course/notes/:id",p,Go);x.post("/:id/announcements/new",p,u,C.single("image"),Ko);x.get("/:id/announcements/:announcement",p,u,Xo);x.get("/:id/announcements",p,Zo);x.patch("/:course/announcements/:id",p,u,Qo);x.patch("/:id/announcements/:announcement/image",p,u,C.single("image"),qo);x.delete("/:id/announcements/:announcement",p,u,es);x.patch("/:id/announcements/:announcement/comments/add",p,ts);x.get("/:id/announcements/:announcement/comments",p,os);x.patch("/:id/announcements/:announcement/comments/delete",p,ss);var ns=x;var ps=h(require("express"),1);var as=async(e,t,n)=>{let{lang:s}=e.headers,{course:r}=e.body,o=new W({...e.body,user:e.user._id});try{if(await W.findOne({course:r,user:e.user._id}))throw t.status(400),new Error(d.course[s].already_reviewed);let i=await o.save();t.status(201).json({success:!0,code:201,message:d.course[s].review_add,review:i._id})}catch(a){n(a)}},is=async(e,t,n)=>{let{lang:s}=e.headers;try{let r=await W.find({...e.query});if(!r||r.length<1)throw t.status(404),new Error(d.course[s].no_reviews);t.json({success:!0,code:200,reviews:r})}catch(r){n(r)}},cs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await W.findOne({course:r,user:e.user._id});if(!o)throw t.status(404),new Error(d.course[s].no_reviews);t.json({success:!0,code:200,review:o})}catch(o){n(o)}},ds=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=await W.findById(o);if(!a)throw t.status(404),new Error(d.course[s].no_reviews);let i=["comment","rating"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.user[s].require_data);for(let l in r)if(i.includes(l))if(r[l])a[l]=r[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);let c=await a.save();t.json({success:!0,code:200,message:d.course[s].review_update,review:c})}catch(a){n(a)}},ls=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await W.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_reviews);await o.remove(),t.json({success:!0,code:200,message:d.course[s].review_delete,review:o._id})}catch(o){n(o)}};var ce=new ps.default.Router;ce.post("/add",p,as);ce.get("/all",is);ce.get("/:id",p,cs);ce.patch("/:id",p,ds);ce.delete("/:id",p,ls);var us=ce;var xs=h(require("express"),1);var ms=async(e,t,n)=>{let{lang:s}=e.headers,{info:r}=e.body,o=new k(e.body);try{if(await k.findOne({info:r}))throw t.status(400),new Error(d.course[s].instructor_exist);e.fileName&&(o.avatar=e.fileName);let i=await o.save();t.status(201).json({success:!0,code:201,message:d.course[s].instructor_add,instructor:i._id})}catch(a){n(a)}},fs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=null;if(e.user.isAdmin?o=await k.findById(r).populate("info"):o=await k.findOne({info:e.user._id}).populate("info"),!o)throw t.status(404),new Error(d.course[s].no_instructor);t.json({success:!0,code:200,instructor:o})}catch(o){n(o)}},gs=async(e,t,n)=>{let{lang:s}=e.headers,{page:r,skip:o}=e.query;try{let a=await k.count({}),i=await k.find({}).populate("info","firstName lastName").populate("reviews.user","firstName lastName").limit(parseInt(r)||10).skip(parseInt(o)||0);if(!i||i.length<1)throw t.status(404),new Error(d.course[s].no_instructor);t.json({success:!0,code:200,instructors:i,count:a})}catch(a){n(a)}},hs=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=null;if(e.user.isAdmin?a=await k.findById(o):a=await k.findOne({info:e.user._id}),!a)throw t.status(404),new Error(d.course[s].no_instructor);let i=["about","role"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.user[s].require_data);for(let l in r)if(i.includes(l))if(r[l])a[l]=r[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);e.fileName&&(a.avatar=e.fileName);let c=await a.save();t.json({success:!0,code:200,message:d.course[s].instructor_update,instructor:c})}catch(a){n(a)}},ys=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await k.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_instructor);await o.remove(),t.json({success:!0,code:200,message:d.course[s].instructor_delete,instructor:o._id})}catch(o){n(o)}},ws=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,o={...e.body,user:e.user._id};try{let a=await k.findById(r);if(!a)throw t.status(404),new Error(d.course[s].review_no_instructor);if(a.reviews.find(c=>c.user.toString()===e.user._id.toString()))throw t.status(400),new Error(d.course[s].already_review);a.reviews=a.reviews.concat(o),await a.save(),t.status(201).json({success:!0,code:201,message:d.course[s].review_add})}catch(a){n(a)}},bs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{page:o,skip:a}=e.query;try{let i=await k.findById(r);if(!i)throw t.status(404),new Error(d.course[s].no_instructor);if(!i.reviews||i.reviews.length<1)throw t.status(404),new Error(d.course[s].no_reviews);let c=i.reviews.slice(parseInt(a),parseInt(o)+parseInt(a));if(c.length<1)throw t.status(404),new Error(d.course[s].end_reviews);t.json({success:!0,code:200,reviews:c})}catch(i){n(i)}},_s=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await k.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_instructor);let a=o.reviews.find(i=>i.user.toString()===e.user._id.toString());if(!a)throw t.status(404),new Error(d.course[s].no_reviews);o.reviews=o.reviews.filter(i=>i.user.toString()!==e.user._id.toString()),await o.save(),t.json({success:!0,code:200,message:d.course[s].delete_review,review:a._id})}catch(o){n(o)}};var K=new xs.default.Router;K.post("/add",C.single("avatar"),p,u,ms);K.get("/:id",p,fs);K.get("/",p,u,gs);K.patch("/:id",p,C.single("avatar"),hs);K.delete("/:id",p,u,ys);K.get("/:id/reviews",bs);K.post("/:id/reviews/add",p,ws);K.delete("/:id/reviews",p,_s);var vs=K;var Ds=h(require("express"),1);var As=h(require("fs"),1),Is=h(require("path"),1);var Es=async(e,t,n)=>{let{lang:s}=e.headers,r=new j({...e.body,author:e.user._id,image:e.fileName});try{if(await j.findOne({title:e.body.title}))throw t.status(400),new Error(d.blog[s].blog_exist);let a=await r.save();t.status(201).json({success:!0,code:201,message:d.blog[s].blog_create,blog:a._id})}catch(o){n(o)}},Ss=async(e,t,n)=>{let{lang:s}=e.headers,{title:r,views:o,page:a,skip:i}=e.query,c={};try{if(r&&(c={title:{$regex:r,$options:"i"}}),o){let m=o.split("-");if(m.length>1){let g=parseInt(m[0]),y=parseInt(m[1]);c={...c,seen:{$gte:g,$lte:y}}}else c={...c,seen:parseInt(m[0])}}let l=await j.count({...c}),f=await j.find({...c}).populate("author","firstName lastName email phoneNumber").populate({path:"comments",populate:{path:"user",select:"firstName lastName"}}).limit(parseInt(a)||10).skip(parseInt(i)||0);if(!f||f.length<1)throw t.status(404),new Error(d.blog[s].no_blogs);t.json({success:!0,code:200,blogs:f,count:l})}catch(l){n(l)}},Ns=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await j.findById(r).populate({path:"author",select:"firstName lastName"}).populate({path:"comments",populate:{path:"user",select:"firstName lastName"}});if(!o)throw t.status(404),new Error(d.blog[s].no_blog);t.json({success:!0,code:200,blog:o})}catch(o){n(o)}},ks=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=await j.findById(o);if(!a)throw t.status(404),new Error(d.blog[s].no_blog);let i=["title","body"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.user[s].require_data);for(let l in r)if(i.includes(l))if(r[l])a[l]=r[l];else throw t.status(400),new Error(`please provide a value for ${l}`);else throw t.status(400),new Error(`${l} is Unknown, please choose a verified key`);let c=await a.save();t.json({success:!0,code:200,message:d.blog[s].blog_update,blog:c})}catch(a){n(a)}},Cs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await j.findById(r);if(!o)throw t.status(404),new Error(d.blog[s].no_blog);o.seen=o.seen+1,await o.save(),t.json({success:!0,code:200,seen:o.seen})}catch(o){n(o)}},Ps=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{if(!e.fileName)throw t.status(400),new Error(d.product[s].image_upload_require);let o=await j.findById(r);if(!o)throw t.status(404),new Error(d.blog[s].no_blog);As.default.unlink(Is.default.resolve(`server/uploads/${o.image}`),async()=>{o.image=e.fileName,await o.save(),t.json({success:!0,code:200,image:e.fileName,message:d.product[s].image_upload})})}catch(o){n(o)}},$s=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await j.findById(r);if(!o)throw t.status(404),new Error(d.blog[s].no_blog);await o.remove(),t.json({success:!0,code:200,message:d.blog[s].blog_delete,blog:o._id})}catch(o){n(o)}},js=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,o={...e.body,user:e.user._id};try{let a=await j.findById(r);if(!a)throw t.status(404),new Error(d.blog[s].comment_no_blog);if(a.comments.find(m=>m.user.toString()===e.user._id.toString()))throw t.status(400),new Error(d.blog[s].already_comment_blog);a.comments=a.comments.concat(o);let c=await a.save(),f=(await j.findById(c._id).populate({path:"comments",populate:{path:"user",select:"firstName lastName"}})).comments.find(m=>m.user._id.toString()===e.user._id.toString());t.status(201).json({success:!0,code:201,comment:f,message:d.blog[s].blog_comment_add})}catch(a){n(a)}},Os=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params,{page:o,skip:a}=e.query;try{let i=await j.findById(r);if(!i)throw t.status(404),new Error(d.blog[s].no_blog);if(!i.comments||i.comments.length<1)throw t.status(404),new Error(d.blog[s].blog_no_comments);let c=i.comments.slice(parseInt(a),parseInt(o)+parseInt(a));if(c.length<1)throw t.status(404),new Error(d.blog[s].blog_end_comments);t.json({success:!0,code:200,comments:c})}catch(i){n(i)}},Rs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r,commentId:o}=e.params;try{let a=await j.findById(r);if(!a)throw t.status(404),new Error(d.blog[s].no_blog);let i=null;if(o)a.comments=a.comments.filter(c=>c._id.toString()!==o.toString()),i=o;else{let c=a.comments.find(l=>l.user.toString()===e.user._id.toString());if(!c)throw t.status(404),new Error(d.blog[s].blog_no_comments);i=c._id,a.comments=a.comments.filter(l=>l.user.toString()!==e.user._id.toString())}await a.save(),t.json({success:!0,code:200,message:d.blog[s].blog_comment_delete,comment:i})}catch(a){n(a)}};var H=new Ds.default.Router;H.post("/new",p,u,C.single("image"),Es);H.get("/:id",Ns);H.get("/",Ss);H.patch("/:id",p,u,ks);H.patch("/:id/views",Cs);H.patch("/image/:id",p,u,C.single("image"),Ps);H.delete("/:id",p,u,$s);H.get("/:id/comments",Os);H.post("/:id/comments/add",p,js);H.delete("/:id/comments/:commentId?",p,Rs);var Ts=H;var Ls=h(require("express"),1);var Bs=async(e,t,n)=>{let{lang:s}=e.headers,{item:r,itemType:o}=e.body,a=new G({...e.body,user:e.user._id});try{if(await G.findOne({user:e.user._id,item:r}))throw t.status(400),new Error(d.product[s].already_wishlist);let c=await a.save();if(o==="product"){let l=await N.findById(c.item),f={_id:l._id,name:l.name,image:l.image,price:l.price};t.status(201).json({success:!0,code:201,message:d.product[s].wishlist_add,product:f})}else t.status(201).json({success:!0,code:201,message:d.product[s].wishlist_add})}catch(i){n(i)}},zs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await G.findOne({item:r});if(!o)throw t.status(404),new Error(d.product[s].no_item);await o.remove(),t.json({success:!0,code:200,item:o.item})}catch(o){n(o)}},Fs=async(e,t,n)=>{let{lang:s}=e.headers,{type:r}=e.query;try{let o=await G.find({user:e.user._id,itemType:r});if(!o||o.length<1)throw t.status(404),new Error(d.product[s].no_item);let a=[];r==="course"?a=await Promise.all(o.map(async i=>{let c=await S.findById(i.item);return{_id:c._id,name:c.name,description:c.description,image:c.image,price:c.price}})):r==="product"&&(a=await Promise.all(o.map(async i=>{let c=await N.findById(i.item);return{_id:c._id,name:c.name,image:c.images[0].src,price:c.price}}))),t.json({success:!0,code:200,items:a})}catch(o){n(o)}};var Be=new Ls.default.Router;Be.post("/add",p,Bs);Be.delete("/:id",p,zs);Be.get("/",p,Fs);var Us=Be;var Ys=h(require("express"),1);var Ie=h(require("mongoose"),1),na=new Ie.default.Schema({user:{type:Ie.default.Schema.Types.ObjectId,ref:"User"},product:{type:Ie.default.Schema.Types.ObjectId,ref:"Product"},date:{type:Date,required:!0},phone:{type:String,required:!0},method:{type:String,required:!0},isDone:{type:Boolean,default:!1}},{timestamps:!0}),M=Ie.default.model("Call",na);var Hs=async(e,t,n)=>{let{lang:s}=e.headers,{phone:r}=e.body,o=new M({...e.body});try{let a=await M.findOne({phone:r,user:e.user._id,isDone:!1});if(a&&!a.isDone)throw t.status(400),new Error(d.contact[s].already_booked);let i=await o.save();t.json({success:!0,code:201,message:d.contact[s].booked_call,call:i._id})}catch(a){n(a)}},Ms=async(e,t,n)=>{try{let s=await M.find({isDone:!1}).sort({createdAt:-1}).limit(5),r=await M.count({isDone:!1}),o=s.map(a=>({id:a._id,title:`A new booking from ${a.phone}`,content:`${a.phone} ask for call using ${a.method}`,phone:a.phone}));t.send({code:200,success:!0,count:r,calls:o})}catch(s){n(s)}},Vs=async(e,t,n)=>{let{lang:s}=e.headers,{page:r,skip:o,phone:a,method:i,isDone:c,date:l}=e.query;try{let f={};if(a&&(f={...f,phone:a}),i&&(f={...f,method:i}),c&&(f={...f,isDone:c==="true"}),l){let y=new Date(l);y.setDate(y.getDate()+1),f={...f,date:{$gte:new Date(l),$lte:new Date(y)}}}let m=await M.find(f).sort({createdAt:-1}).limit(parseInt(r)||10).skip(parseInt(o)||0).populate("user","firstName lastName phoneNumber email").populate("product","name"),g=await M.count({});if(!m||m.length<1)throw t.status(404),new Error(d.contact[s].no_calls_booked);t.json({success:!0,code:200,count:g,calls:m})}catch(f){n(f)}},Js=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{let o=await M.findById(s);if(!o)throw t.status(404),new Error(d.contact[r].no_call);o.isDone=!o.isDone;let a=o.isDone?d.contact[r].done_call:d.contact[r].active_call;await o.save(),t.json({success:!0,code:200,message:a})}catch(o){n(o)}},Gs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await M.findById(r);if(!o)throw t.status(404),new Error(d.contact[s].no_call);await o.remove(),t.json({success:!0,code:200,message:d.contact[s].call_delete})}catch(o){n(o)}};var de=Ys.default.Router();de.post("/book",p,Hs);de.patch("/:id",p,u,Js);de.get("",p,u,Vs);de.get("/latest",p,u,Ms);de.delete("/:id",p,u,Gs);var Ws=de;var er=h(require("express"),1);var ze=h(require("mongoose"),1),aa=new ze.default.Schema({user:{type:ze.default.Schema.Types.ObjectId,ref:"User"},name:{type:String,required:!0},phone:{type:String,required:!0},email:{type:String,required:!0},message:{type:String,required:!0},isRead:{type:Boolean,default:!1}},{timestamps:!0}),Y=ze.default.model("Contact",aa);var Ks=async(e,t,n)=>{let{lang:s}=e.headers,r=new Y(e.body);try{let o=await r.save();t.status(201).json({success:!0,code:201,message:d.contact[s].contact_sent,contact:o._id})}catch(o){n(o)}},Zs=async(e,t,n)=>{let{lang:s}=e.headers,{page:r,skip:o,name:a,phone:i,email:c,isRead:l}=e.query;try{let f={};a&&(f={...f,name:{$regex:a,$options:"i"}}),i&&(f={...f,phone:i}),c&&(f={...f,email:c}),l&&(f={...f,isRead:l==="true"});let m=await Y.find(f).sort({createdAt:-1}).limit(parseInt(r)||10).skip(parseInt(o)||0).populate("user","firstName lastName"),g=await Y.count();if(!m||m.length<1)throw t.status(404),new Error(d.contact[s].no_contacts);t.json({success:!0,code:200,contacts:m,count:g})}catch(f){n(f)}},Xs=async(e,t,n)=>{try{let s=await Y.find({isRead:!1}).sort({createdAt:-1}).limit(5),r=await Y.count({isRead:!1}),o=s.map(a=>({id:a._id,title:`A new message from ${a.email}`,content:a.message.substring(0,45)+"....",email:a.email}));t.send({code:200,success:!0,count:r,contacts:o})}catch(s){n(s)}},Qs=async(e,t,n)=>{let{id:s}=e.params,{lang:r}=e.headers;try{let o=await Y.findById(s);if(!o)throw t.status(404),new Error(d.contact[r].no_contact);o.isRead=!o.isRead;let a=o.isRead?d.contact[r].read_contact:d.contact[r].no_read_contact;await o.save(),t.json({success:!0,code:200,message:a})}catch(o){n(o)}},qs=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await Y.findById(r);if(!o)throw t.status(404),new Error(d.contact[s].no_contact);await o.remove(),t.json({success:!0,code:200,message:d.contact[s].contact_delete})}catch(o){n(o)}};var le=er.default.Router();le.post("/new",Ks);le.patch("/:id",p,u,Qs);le.get("/",p,u,Zs);le.get("/latest",p,u,Xs);le.delete("/:id",p,u,qs);var tr=le;var cr=h(require("express"),1);var ot=h(require("mongoose"),1),ia=new ot.default.Schema({code:{type:String,unique:!0,required:!0},discountPercentage:{type:Number,required:!0},isValid:{type:Boolean,default:!0},applyLimit:{type:Number,default:0},applyCount:{type:Number,default:0},expiryAt:{type:Date}},{timestamps:!0}),V=ot.default.model("Coupon",ia);var or=async(e,t,n)=>{let{lang:s}=e.headers,{code:r}=e.body,o=new V(e.body);try{if(await V.findOne({code:r}))throw t.status(400),new Error(d.course[s].coupon_exist);let i=await o.save();t.status(201).json({success:!0,code:201,coupon:i,message:d.course[s].coupon_create})}catch(a){n(a)}},sr=async(e,t,n)=>{let{lang:s}=e.headers,{code:r}=e.query;try{let o=await V.findOne({code:r});if(!o)throw t.status(404),new Error(d.course[s].no_coupon);if(!o.isValid)throw t.status(400),new Error(d.course[s].coupon_not_valid);if(o.applyLimit>0&&o.expiryAt){let a=new Date().toISOString();if(o.applyCount>=o.applyLimit||a>o.expiryAt.toISOString())throw o.isValid=!1,await o.save(),t.status(400),new Error(d.course[s].coupon_expired);o.applyCount+=1,o.applyCount===o.applyLimit&&(o.isValid=!1),await o.save(),t.json({success:!0,code:200,coupon:o.code,discount:o.discountPercentage})}if(o.applyLimit>0&&!o.expiryAt){if(o.applyCount>=o.applyLimit)throw o.isValid=!1,await o.save(),t.status(400),new Error(d.course[s].coupon_expired);o.applyCount+=1,o.applyCount===o.applyLimit&&(o.isValid=!1),await o.save(),t.json({success:!0,code:200,coupon:o.code,discount:o.discountPercentage})}if(o.expiryAt&&o.applyLimit<1){if(new Date().toISOString()>o.expiryAt.toISOString())throw o.isValid=!1,await o.save(),t.status(400),new Error(d.course[s].coupon_expired);o.applyCount+=1,await o.save(),t.json({success:!0,code:200,coupon:o.code,discount:o.discountPercentage})}}catch(o){n(o)}},rr=async(e,t,n)=>{let{lang:s}=e.headers,{page:r,skip:o}=e.query;try{let a=await V.find({...e.body}),i=await V.count({});if(!a||a.length<1)throw t.status(404),new Error(d.course[s].no_coupon);t.json({success:!0,code:200,coupons:a,count:i})}catch(a){n(a)}},nr=async(e,t,n)=>{let{lang:s}=e.headers,r=e.body,{id:o}=e.params;try{let a=await V.findById(o);if(!a)throw t.status(404),new Error(d.course[s].no_coupon);let i=["code","discountPercentage","applyLimit","expiryAt"];if(Object.keys(r).length<1)throw t.status(400),new Error(d.user[s].require_data);for(let c in r)if(i.includes(c))if(c==="expiryAt")a[c]=r[c];else if(r[c])a[c]=r[c];else throw t.status(400),new Error(`please provide a value for ${c}`);else throw t.status(400),new Error(`${c} is Unknown, please choose a verified key`);await a.save(),t.json({success:!0,code:200,message:d.course[s].coupon_update,coupon:a._id})}catch(a){n(a)}},ar=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await V.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_coupon);o.isValid=!o.isValid;let a=o.isValid?d.course[s].valid_coupon:d.course[s].not_valid_coupon;await o.save(),t.json({success:!0,code:200,message:a})}catch(o){n(o)}},ir=async(e,t,n)=>{let{lang:s}=e.headers,{id:r}=e.params;try{let o=await V.findById(r);if(!o)throw t.status(404),new Error(d.course[s].no_coupon);await o.remove(),t.json({success:!0,code:200,message:d.course[s].coupon_delete})}catch(o){n(o)}};var q=cr.default.Router();q.post("/new",p,u,or);q.patch("/:id",p,u,nr);q.patch("/:id/validity",p,u,ar);q.get("/acquire",p,sr);q.get("/",p,u,rr);q.delete("/:id",p,u,ir);var dr=q;var xr=h(require("express"),1);var T=h(require("fs"),1),B=h(require("path"),1);var pe=require("googleapis"),Ee=h(require("node-fetch"),1);var ca=["https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive.metadata","https://www.googleapis.com/auth/drive.appdata"],lr="12JHc6nWos-HuOmHvPollweyZuVv6b-E7",pr="1zCNLfYRxhrahRi4v0evO81QSg32QCScp",ue=async()=>{let e=B.default.join(A,"src/gcr.json"),t=JSON.parse(T.default.readFileSync(e,"utf8")).web,{client_id:n,client_secret:s,redirect_uris:r}=t;return new pe.google.auth.OAuth2(n,s,r)},da=async()=>(await ue()).generateAuthUrl({access_type:"offline",scope:ca}),la=async e=>{let t=await ue(),n=await t.getToken(e);t.setCredentials(n),T.default.writeFileSync(B.default.join(A,"src/gact.json"),JSON.stringify(n))},Fe=e=>JSON.parse(T.default.readFileSync(B.default.join(A,"src/gact.json"),"utf8")).tokens,st=async(e,t)=>{let n="'me' in owners and mimeType != 'application/vnd.google-apps.folder'";e&&(n=`${n} and name contains '${e}'`),t&&(n=t==="courses"?`${n} and '${lr}' in parents`:`${n} and '${pr}' in parents`);let s=await ue();return s.setCredentials(Fe()),(await pe.google.drive({version:"v3",auth:s}).files.list({q:n,fields:"nextPageToken, files(id,name)"})).data.files},pa=async e=>{let t=await ue();t.setCredentials(Fe());let n=pe.google.drive({version:"v3",auth:t});try{let s=await n.files.get({fileId:e,fields:"id,webContentLink"});return(await n.permissions.list({fileId:e,fields:"permissions"})).data.permissions[0].role!=="reader"&&await n.permissions.create({fileId:e,requestBody:{role:"reader",type:"anyone"}}),{success:!0,file:s.data}}catch(s){return{success:!1,error:s.response.data.error.message}}},ua=async e=>{let t=await ue();t.setCredentials(Fe());let n=pe.google.drive({version:"v3",auth:t});try{let r=(await n.permissions.list({fileId:e,fields:"permissions"})).data.permissions[0];return await n.permissions.delete({permissionId:r.id,fileId:e}),{response:!0}}catch(s){return{response:!1,error:s.response.data.error.message}}},ma=async e=>{let t=await ue();t.setCredentials(Fe()),await pe.google.drive({version:"v3",auth:t}).files.delete({fileId:e})},fa=async e=>{let t=JSON.parse(T.default.readFileSync(B.default.join(A,"src/gact.json"),"utf8")).tokens.refresh_token,{client_secret:n,client_id:s}=JSON.parse(T.default.readFileSync(B.default.join(A,"src/gcr.json"),"utf8")).web,r="https://www.googleapis.com/oauth2/v4/token",a={method:"POST",body:JSON.stringify({refresh_token:t,client_id:s,client_secret:n,grant_type:"refresh_token"})};return(await(await(0,Ee.default)(r,a)).json()).access_token};async function ur(e,t,n){let{id:s,type:r,part:o}=e.body;try{if(r==="course"&&!await S.findById(s))throw t.status(404),new Error("The course id isn't valid please choose a valid one");if(r==="product"&&!await N.findById(s))throw t.status(404),new Error("The product id isn't valid please choose a valid one");if(!o)throw t.status(404),new Error("Please Specify the Part for the Asset");let a=r==="course"?[lr]:r==="product"&&[pr],i=JSON.parse(T.default.readFileSync(B.default.join(A,"src/resumable_uri.json"),"utf8")),c=i.find(_=>_._id===s&&_.part===o);if(c){e.resumeURI=c.uri,n();return}let l=e.file,f=await fa(),m=JSON.stringify({name:l.originalname,mimeType:l.mimetype,parents:a}),g="https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",y={method:"post",body:m,headers:{Authorization:`Bearer ${f}`,"Content-Type":"application/json; charset=UTF-8"}},w=(await(0,Ee.default)(g,y)).headers.get("location");if(w){let _=[...i,{_id:s,part:o,uri:w}];T.default.writeFileSync(B.default.join(A,"src/resumable_uri.json"),JSON.stringify(_)),e.resumeURI=w,n()}else throw t.status(500),new Error("something went wrong please upload file again")}catch(a){n(a)}}var mr=async(e,t,n)=>{let{code:s}=e.query;try{T.default.existsSync(B.default.join(A,"src/gact.json"))||await la(s);let r=await st();t.send({code:200,success:!0,files:r})}catch(r){n(r)}},fr=async(e,t,n)=>{try{if(T.default.existsSync(B.default.join(A,"src/gact.json"))){let r=await st();console.log("Files: ",r),t.send({success:!0,code:200,files:r});return}let s=await da();t.send({code:200,success:!0,url:s})}catch(s){n(s)}},gr=async(e,t,n)=>{let{name:s,folder:r}=e.query;try{if(T.default.existsSync(B.default.join(A,"src/gact.json"))){let o=await st(s,r);t.send({success:!0,code:200,files:o});return}else throw t.status(400),new Error("Please Access Google Drive First")}catch(o){n(o)}},hr=async(e,t,n)=>{let{start:s,end:r,length:o,id:a,type:i,part:c}=e.body;try{if(e.file){let l=e.file,f=e.resumeURI,m={method:"PUT",headers:{"Content-Length":l.size,"Content-Range":`bytes ${s}-${r-1}/${o}`},body:l.buffer},g=await(0,Ee.default)(f,m);if([500,502,503,504].includes(g.status))throw t.status(g.status),new Error("service unavailable right now, please try again after while");if(g.status===200||g.status===201){let b=await g.json();if(i==="course"){let P=await S.findById(a);P.driveFile=P.driveFile.concat({link:b.id,part:parseInt(c)}),await P.save()}else if(i==="product"){let P=await N.findById(a);P.driveFile=P.driveFile.concat({link:b.id,part:parseInt(c)}),await P.save()}let w=JSON.parse(T.default.readFileSync(B.default.join(A,"src/resumable_uri.json"),"utf-8")),_=w.findIndex(P=>P._id===a&&P.part===c);_!==-1&&w.splice(_,1),T.default.writeFileSync(B.default.join(A,"src/resumable_uri.json"),JSON.stringify(w)),t.status(201).send({code:201,success:!0,message:"File has Uploaded Successfully"})}else t.status(200).send({success:!0,uploaded:o-r,message:null})}else throw t.status(400),new Error("Please Select File to upload?!")}catch(l){n(l)}},yr=async(e,t,n)=>{let{id:s}=e.params;try{let r=await pa(s,t);if(!r.success)throw new Error(r.error);r.success&&t.send({success:!0,code:200,file:r.file,key:process.env.GOOGLE_API_KEY})}catch(r){n(r)}},wr=async(e,t,n)=>{let{id:s}=e.params;try{await ua(s,t)&&t.sendStatus(200)}catch(r){n(r)}},br=async(e,t,n)=>{let{id:s}=e.params;try{await ma(s),t.send({success:!0,code:200,message:"The File has deleted successfully"})}catch(r){let o=r.response.data.error;n({message:o.message})}},_r=async(e,t,n)=>{let{type:s,id:r,size:o,part:a}=e.body;try{if(s==="course"&&!await S.findById(r))throw t.status(404),new Error("The course id isn't valid please choose a valid one");if(s==="product"&&!await N.findById(r))throw t.status(404),new Error("The product id isn't valid please choose a valid one");if(!a)throw t.status(404),new Error("Please Specify the Part for the Asset");let c=JSON.parse(T.default.readFileSync(B.default.join(A,"src/resumable_uri.json"),"utf-8")).find(m=>m._id===r&&m.part===a);if(!c)throw t.status(404),new Error("The upload link isn't found, maybe the download completed or you didn't start at all");let l={method:"PUT",headers:{"Content-Range":`bytes */${o}`}},f=await(0,Ee.default)(c.uri,l);if(f.status===404)throw t.status(404),new Error("The Upload Link has Expired, Please Upload File Again?!");if(f.status===200||f.status===201){t.status(200).send({code:200,message:"The File Has Uploaded Completely, No Need to Resume"});let m=JSON.parse(T.default.readFileSync(B.default.join(A,"src/resumable_uri.json"),"utf-8")),g=m.findIndex(y=>y._id===r&&y.part===a);g!==-1&&m.splice(g,1),T.default.writeFileSync(B.default.join(A,"src/resumable_uri.json"),JSON.stringify(m));return}if(f.status===308){let m=f.headers.get("range");t.status(200).send({code:200,range:m,message:"The File Need to Resume"});return}}catch(i){n(i)}};var Z=xr.default.Router();Z.post("/authenticate",p,u,fr);Z.post("/accessToken",p,u,mr);Z.post("/upload",p,u,Yt.single("blob"),ur,hr);Z.patch("/resume",p,u,_r);Z.delete("/delete/:id",p,u,br);Z.get("/download/:id",p,yr);Z.delete("/permission/:id",p,wr);Z.get("/search",p,gr);var vr=Z;var kr=h(require("express"),1);var Ar=async(e,t,n)=>{try{let s=await E.count({}),r=await S.count({}),o=await N.count({}),a=await j.count({}),i=await z.find({}),c=await z.count({}),l=await O.find({}),f=await O.count({}),m=i.reduce((y,b)=>b.totalPrice+y,0),g=l.reduce((y,b)=>b.payment+y,0);t.send({success:!0,code:200,info:{users:s,courses:r,products:o,blogs:a,orders:{count:c,sales:m},enrollments:{count:f,sales:g}}})}catch(s){n(s)}},Ir=async(e,t,n)=>{try{let s=await E.find({},{firstName:1,lastName:1,createdAt:1}).sort({createdAt:-1}).limit(10);t.send({success:!0,code:200,users:s})}catch(s){n(s)}},Er=async(e,t,n)=>{try{let s=await Y.find({isRead:!1},{name:1,message:1,createdAt:1}).sort({createdAt:-1}).limit(10),r=await M.find({isDone:!1},{phone:1,method:1,createdAt:1}).sort({createdAt:-1}).limit(10),o=s.map(i=>({_id:i._id,title:`New Contact from ${i.name}`,createdAt:i.createdAt})),a=r.map(i=>({_id:i._id,title:`New Booking from ${i.phone}`,createdAt:i.createdAt}));t.send({success:!0,code:200,info:[...a,...o]})}catch(s){n(s)}},Sr=async(e,t,n)=>{try{let s=new Date,r=new Date(new Date().setDate(new Date().getDate()-7)),o={saturday:0,sunday:0,monday:0,tuesday:0,wednesday:0,thursday:0,friday:0};(await z.aggregate([{$match:{createdAt:{$gte:r,$lte:s}}},{$project:{_id:0,day:{$dayOfWeek:"$createdAt"}}}])).forEach(({day:i})=>{i===1&&(o.sunday=+o.sunday+1),i===2&&(o.monday=+o.monday+1),i===3&&(o.tuesday=+o.tuesday+1),i===4&&(o.wednesday=+o.wednesday+1),i===5&&(o.thursday=+o.thursday+1),i===6&&(o.friday=+o.friday+1),i===7&&(o.saturday=+o.saturday+1)}),t.send({success:!0,code:200,orders:Object.values(o)})}catch(s){n(s)}},Nr=async(e,t,n)=>{try{let s=new Date,r=new Date(new Date().setDate(new Date().getDate()-7)),o={saturday:0,sunday:0,monday:0,tuesday:0,wednesday:0,thursday:0,friday:0};(await O.aggregate([{$match:{createdAt:{$gte:r,$lte:s}}},{$project:{_id:0,day:{$dayOfWeek:"$createdAt"}}}])).forEach(({day:i})=>{i===1&&(o.sunday=+o.sunday+1),i===2&&(o.monday=+o.monday+1),i===3&&(o.tuesday=+o.tuesday+1),i===4&&(o.wednesday=+o.wednesday+1),i===5&&(o.thursday=+o.thursday+1),i===6&&(o.friday=+o.friday+1),i===7&&(o.saturday=+o.saturday+1)}),t.send({success:!0,code:200,enrollments:Object.values(o)})}catch(s){n(s)}};var me=new kr.default.Router;me.get("/info",p,u,Ar);me.get("/users",p,u,Ir);me.get("/enrollments",p,u,Nr);me.get("/orders",p,u,Sr);me.get("/contacts",p,u,Er);var Cr=me;var Tr=h(require("express"),1);var Le=h(require("mongoose"),1),Pr=new Le.default.Schema({image:{type:String,required:!0},header:{en:{type:String},ar:{type:String}},subHeader:{en:String,ar:String},target:{itemId:{type:Le.default.Schema.Types.ObjectId,refPath:"onModal"},type:{type:String}},onModal:{type:String,required:!0,enum:["Course","Product","Blog"]}},{timestamps:!0});Pr.post("save",(e,t)=>{e.populate({path:"target",populate:{path:"itemId",select:"name title"}}).then(n=>t())});var Ue=Le.default.model("Slider",Pr);var $r=h(require("fs"),1),jr=h(require("path"),1),Or=async(e,t,n)=>{let{target:s}=e.body,r=JSON.parse(s),o=JSON.parse(e.body.header),a=JSON.parse(e.body.subHeader),i=new Ue({header:o,subHeader:a,target:r});try{switch(r.type){case"product":i.onModal="Product";break;case"course":i.onModal="Course";break;case"blog":i.onModal="Blog";break;default:break}e.file&&(i.image=e.file.filename);let c=await i.save();t.status(201).json({code:200,success:!0,message:"Slider created successfully",slider:c})}catch(c){n(c)}},Rr=async(e,t,n)=>{try{let s=await Ue.findById(e.params.id);if(!s)throw new Error("Slider not found");$r.default.unlinkSync(jr.default.resolve(A,`src/uploads/${s.image}`)),await s.remove(),t.status(200).json({code:200,success:!0,message:"Slider deleted successfully"})}catch(s){n(s)}},Dr=async(e,t,n)=>{try{let s=await Ue.find().populate({path:"target",populate:{path:"itemId",select:"name title"}});t.status(200).json({code:200,success:!0,sliders:s})}catch(s){n(s)}};var He=new Tr.default.Router;He.post("/add",p,u,Gt.single("slider"),Or);He.get("/",Dr);He.delete("/:id",p,u,Rr);var Br=He;var Gr=h(require("express"),1);var zr=h(require("fs"),1),Fr=h(require("path"),1);var rt=h(require("mongoose"),1),ga=new rt.default.Schema({from:{type:String,required:!0},sender:{type:String,required:!0},recipient:{type:String,required:!0},subject:{type:String,required:!0},html:{type:String,required:!0},attachments:[{path:String,mimetype:String,originalName:String}],isStarred:{type:Boolean,default:!1},isRead:{type:Boolean,default:!1},isArchived:{type:Boolean,default:!1}},{timestamps:!0}),Q=rt.default.model("Support",ga);var Lr=async(e,t,n)=>{if(e.body["X-Mailgun-Incoming"]!=="Yes")return e.files&&e.files.forEach(l=>{zr.default.unlinkSync(Fr.default.resolve(A,`src/uploads/${l.filename}`))}),t.status(400).json("Invalid request");let s=e.body.from.split("<")[0].trim(),r=e.body.sender,o=e.body.recipient,a=e.body.subject,i=e.body["stripped-html"],c=new Q({from:s,sender:r,recipient:o,subject:a,html:i});if(e.files){let l=e.files.map(f=>({path:f.filename,mimetype:f.mimetype,originalName:f.originalname}));c.attachments=l}try{await c.save(),t.sendStatus(200)}catch{t.status(500),n(new Error("something went wrong"))}},Ur=async(e,t,n)=>{let s=e.body.sender,r=e.body.recipient,o=e.body.subject,a=e.body.html;try{let i=await E.findOne({email:r}),c=Pe.support({name:i?`${i.firstName} ${i.lastName}`:null,html:a}),l={from:`Elgendy Autotronics Center <${s}>`,to:[r],subject:o,html:c};await $e(l);let m=await new Q({from:"Elgendy Autotronics Center",sender:s,recipient:r,subject:o,isRead:!0,html:c}).save();t.send({code:200,success:!0,email:m,message:"E-mail sent successfully"})}catch(i){n(i)}},Hr=async(e,t,n)=>{let{limit:s,isStarred:r,isArchived:o,isSent:a,keyword:i}=e.query;try{let c={isArchived:!1,$and:[{sender:{$ne:"support@gendyecu.com"}},{sender:{$ne:"noreplay@gendyecu.com"}}]};a&&(c={isArchived:!1,$or:[{sender:{$eq:"support@gendyecu.com"}},{sender:{$eq:"noreplay@gendyecu.com"}}]}),r&&(c={isStarred:r==="true",isArchived:!1}),o&&(c={isArchived:o==="true"}),i&&(a?c={...c,$or:[{subject:{$regex:i,$options:"i"},$or:[{sender:{$eq:"support@gendyecu.com"}},{sender:{$eq:"noreplay@gendyecu.com"}}]},{recipient:{$regex:i,$options:"i"},$or:[{sender:{$eq:"support@gendyecu.com"}},{sender:{$eq:"noreplay@gendyecu.com"}}]}]}:c={...c,$or:[{subject:{$regex:i,$options:"i"}},{sender:{$regex:i,$options:"i"}}]});let l=await Q.find(c).limit(s||15).sort({createdAt:-1}),f=await Q.count({isRead:!1,isArchived:!1,$and:[{sender:{$ne:"support@gendyecu.com"}},{sender:{$ne:"noreplay@gendyecu.com"}}]});t.send({code:200,success:!0,emails:l,inbox:f})}catch(c){n(c)}},Mr=async(e,t,n)=>{let{id:s}=e.params;try{let r=await Q.findById(s);if(!r)throw t.status(404),new Error("Email not found");t.send({code:200,success:!0,email:r})}catch(r){n(r)}},Vr=async(e,t,n)=>{let{id:s}=e.params;try{let r=await Q.findById(s);if(!r)throw t.status(404),new Error("Email not found");await r.remove(),t.send({code:200,success:!0,message:"Email deleted successfully"})}catch(r){n(r)}},Jr=async(e,t,n)=>{let{id:s}=e.params,{isStarred:r,isArchived:o,isRead:a}=e.body;try{let i=await Q.findById(s);if(!i)throw t.status(404),new Error("Email not found");if(r){let l=r==="true";i.isStarred=l}if(o){let l=o==="true";i.isArchived=l}a&&(i.isRead=a);let c=await i.save();t.send({code:200,success:!0,email:c})}catch(i){n(i)}};var fe=Gr.default.Router();fe.post("/outgoing",p,u,Ur);fe.get("/:id",p,u,Mr);fe.get("/",p,u,Hr);fe.delete("/:id",p,u,Vr);fe.patch("/:id",p,u,Jr);var Yr=fe;var Qr=h(require("express"),1);var Wr=async(e,t,n)=>{try{let s=await E.findById(e.user._id),r=await k.findOne({info:e.user._id}),o={firstName:s.firstName,lastName:s.lastName,email:s.email,phoneNumber:s.phoneNumber,about:r?.about??"",image:r?.avatar??"",role:r?.role??"",reviews:r?.reviews??""};t.send({info:o,code:200,success:!0})}catch(s){n(s)}},Kr=async(e,t,n)=>{let{firstName:s,lastName:r,email:o,phoneNumber:a,role:i,about:c}=e.body;try{if(c){let g=await k.findOne({info:e.user._id});g.about=c,await g.save(),t.send({info:{about:c},message:"About has Successfully Updated",code:200,success:!0});return}let l=await E.findByIdAndUpdate(e.user._id,{firstName:s,lastName:r,email:o,phoneNumber:a},{new:!0}),f=await k.findOneAndUpdate({info:e.user._id},{role:i},{new:!0}),m={firstName:l.firstName,lastName:l.lastName,email:l.email,phoneNumber:l.phoneNumber,role:f.role};t.send({info:m,message:"Info has Successfully Updated",code:200,success:!0})}catch(l){n(l)}},Zr=async(e,t,n)=>{try{await k.findOneAndUpdate({info:e.user._id},{avatar:e.file.filename}),t.send({image:e.file.filename,code:200,success:!0})}catch(s){n(s)}},Xr=async(e,t,n)=>{try{let s=await E.findById(e.user._id),r=await k.findOne({info:s._id});t.send({code:200,success:!0,avatar:r.avatar})}catch{}};var ge=new Qr.default.Router;ge.get("/info",p,u,Wr);ge.get("/avatar",p,u,Xr);ge.patch("/info",p,u,Kr);ge.patch("/image",p,u,C.single("image"),Zr);ge.patch("/password",p,u,Oe);var qr=ge;var nn=h(require("express"),1);var nt=h(require("fs"),1),at=h(require("path"),1);var Me=h(require("mongoose"),1),ha=new Me.default.Schema({title:{en:String,ar:String},image:String,order:Number},{timestamps:!0}),ya=new Me.default.Schema({title:{en:String,ar:String},order:Number,image:String,subItems:[ha]},{timestamps:!0}),L=Me.default.model("Menu",ya);var en=async(e,t,n)=>{let{title:s,order:r,parent:o}=e.body;try{if(o){let m=await L.findById(o);if(m.subItems.find(I=>I.title.en===s.en))throw t.status(400),new Error("Menu item already exists");m.subItems.find(I=>I.order===parseInt(r))&&m.subItems.filter(J=>J.order>=parseInt(r)).forEach(J=>{J.order+=1});let b=JSON.parse(s),w={title:b,order:r};e.fileName&&(w.image=e.fileName),m.subItems.push(w);let P=(await m.save()).subItems.find(I=>I.title.en===b.en&&I.order===parseInt(r));t.status(201).send({item:P,message:"Item added successfully",success:!0});return}if(await L.findOne({"title.en":s.en}))throw t.status(400),new Error("Menu item already exists");let i=await L.find();if(i.find(m=>m.order===parseInt(r))){let m=i.filter(g=>g.order>=parseInt(r));for(let g of m)g.order+=1,await g.save()}let l={title:JSON.parse(s),order:r};e.fileName&&(l.image=e.fileName);let f=await L.create(l);t.status(201).send({item:f,message:"Item added successfully",success:!0})}catch(a){n(a)}},tn=async(e,t,n)=>{let{title:s,order:r}=e.body,{id:o,parent:a}=e.params;try{if(a){let f=await L.findById(a),m=f.subItems.find(y=>y.order===parseInt(r)),g=f.subItems.find(y=>y._id.toString()===o);m&&(m.order=g.order),g.title=JSON.parse(s),g.order=r,e.fileName&&(g.image&&nt.default.unlinkSync(at.default.join(A,"src/uploads/",g.image)),g.image=e.fileName),await f.save(),t.status(201).send({item:g,message:"Item updated successfully",success:!0});return}let i=await L.find(),c=await L.findById(o),l=i.find(f=>f.order===parseInt(r));l&&(l.order=c.order,await l.save()),c.title=JSON.parse(s),c.order=r,e.fileName&&(c.image&&nt.default.unlinkSync(at.default.join(A,"src/uploads/",c.image)),c.image=e.fileName),await c.save(),t.send({item:c,message:"Item updated successfully",success:!0})}catch(i){n(i)}},on=async(e,t,n)=>{let{order:s}=e.query,{id:r,parent:o}=e.params;try{if(o){let c=await L.findById(o),l=c.subItems.filter(f=>f._id.toString()!==r);l.forEach(f=>{f.order>parseInt(s)&&(f.order-=1)}),c.subItems=l,await c.save(),t.send({message:"Item deleted successfully",success:!0});return}let a=await L.find();for(let c of a)c.order>parseInt(s)&&(c.order-=1,await c.save());await(await L.findById(r)).remove(),t.send({message:"Item deleted successfully",success:!0})}catch(a){n(a)}},sn=async(e,t,n)=>{try{let s=await L.find().sort({order:1});t.send({items:s,success:!0})}catch(s){n(s)}},rn=async(e,t,n)=>{try{let s=await L.find(),r=[];for(let o of s)o.subItems.length?o.subItems.forEach(a=>r.push(a.title.en)):r.push(o.title.en);t.send({code:200,success:!0,pages:r})}catch(s){n(s)}};var he=nn.default.Router();he.post("/new",p,u,C.single("image"),en);he.patch("/:id/:parent?",p,u,C.single("image"),tn);he.get("/",sn);he.get("/pages",p,u,rn);he.delete("/:id/:parent?",p,u,on);var an=he;var un=h(require("express"),1);var it=h(require("mongoose"),1),wa=new it.default.Schema({path:{type:String,required:!0},type:{type:String,required:!0},title:String,thumbnail:String},{timestamps:!0}),ye=it.default.model("Media",wa);var cn=async(e,t,n)=>{let{type:s,url:r}=e.body,o=new ye({path:s==="image"?e.fileName:r,type:s,title:e.body.title,thumbnail:s==="video"?e.fileName:null});try{let a=await o.save();t.status(201).json({success:!0,message:"Media created successfully",media:a})}catch(a){n(a)}},dn=async(e,t,n)=>{let{type:s,skip:r}=e.query;try{let o=await ye.find({type:s}).sort({createdAt:-1}).limit(15).skip(parseInt(r)),a=await ye.countDocuments({type:s});t.status(200).json({code:200,success:!0,media:o,count:a})}catch(o){n(o)}},ln=async(e,t,n)=>{let{id:s}=e.params,{type:r,url:o,title:a}=e.body;try{let i=await ye.findById(s);if(!i)throw t.status(404),new Error("Media not found");i.path=o,i.type=r,i.title=a,e.fileName&&(i.thumbnail=e.fileName),await i.save(),t.status(200).json({message:"Media updated successfully",media:i})}catch(i){n(i)}},pn=async(e,t,n)=>{let{id:s}=e.params;try{let r=await ye.findById(s);if(!r)throw t.status(404),new Error("Media not found");await r.remove(),t.status(200).json({message:"Media deleted successfully"})}catch(r){n(r)}};var Se=un.default.Router();Se.post("/",p,u,C.single("media"),cn);Se.get("/",dn);Se.put("/:id",p,u,C.single("media"),ln);Se.delete("/:id",p,u,pn);var mn=Se;var hn=h(require("express"),1);var Ne=h(require("@paypal/checkout-server-sdk"),1),ba=process.env.NODE_ENV==="production"?Ne.default.core.LiveEnvironment:Ne.default.core.SandboxEnvironment,_a=new Ne.default.core.PayPalHttpClient(new ba(process.env.PAYPAL_CLIENT_ID,process.env.PAYPAL_CLIENT_SECRET)),fn=async(e,t)=>{if(!process.env.PAYPAL_CLIENT_ID)return t.status(404).send({message:"Paypal client id not found"});t.send({paypalClientId:process.env.PAYPAL_CLIENT_ID,success:!0})},gn=async(e,t,n)=>{let{type:s}=e.params,{items:r,courseId:o,coupon:a}=e.body,i=0,c=[],l={};if(s==="product"){let m=await N.find({_id:{$in:r.map(g=>g.product)}});i=m.reduce((g,y)=>{let b=r.find(w=>w.product===y._id.toString());return g+y.price*b.quantity},0),c=r.map(g=>{let y=m.find(b=>b._id.toString()===g.product);return{name:y.name,unit_amount:{currency_code:"USD",value:y.price.toFixed(2)},quantity:g.quantity}}),l={item_total:{currency_code:"USD",value:i}}}else if(s==="course"){let m=await S.findById(o),g=0;if(a){let _=await V.findOne({code:a});_&&(g=_.discountPercentage)}let y=m.price*m.discount/100;i=parseFloat((m.price-y).toFixed(2));let b=i*g/100;i=parseFloat((i-b).toFixed(2));let w=y+b;c=[{name:m.name,unit_amount:{currency_code:"USD",value:m.price.toFixed(2)},quantity:1}],l={item_total:{currency_code:"USD",value:m.price.toFixed(2)},discount:{currency_code:"USD",value:w.toFixed(2)}}}let f=new Ne.default.orders.OrdersCreateRequest;f.prefer("return=representation"),f.requestBody({intent:"CAPTURE",purchase_units:[{amount:{currency_code:"USD",value:i,breakdown:l},items:c}]});try{let m=await _a.execute(f);t.send({order:{id:m.result.id,total:i},success:!0})}catch(m){n(m)}};var ct=hn.default.Router();ct.get("/clientId",p,fn);ct.post("/order/:type",p,gn);var yn=ct;var wn=async(e,t,n)=>{let s=new Error(`${e.originalUrl} not found`);t.status(404),n(s)},bn=async(e,t,n,s)=>{let r=null;for(let i in e.errors)i==="password"?r=e.errors[i].message:r=`${e.errors[i].value} is invalid please write a valid ${e.errors[i].path}`;let o=n.statusCode===200?500:n.statusCode,a={};process.env.NODE_ENV==="development"?a={success:!1,message:r||e.message,error:o,stack:e.stack}:a={success:!1,message:r||e.message,error:o},n.status(o).send(a)};gt();vn.default.config({path:dt.default.join(A,".env")});var v=(0,ke.default)();v.use((0,xn.default)({origin:process.env.NODE_ENV==="production"?["https://www.gendyecu.com","https://gendyecu.com","https://admin.gendyecu.com"]:["http://localhost:3000","http://localhost:5173"],credentials:!0}));v.use((0,In.default)({contentSecurityPolicy:!1}));v.use((0,En.default)("dev"));v.use(ke.default.json());v.use((0,An.default)());v.use((0,Sn.default)());v.use(ke.default.urlencoded({extended:!1}));v.post("/api/support/incoming",(e,t,n)=>{e.body["X-Mailgun-Incoming"]==="Yes"?n():t.status(400).json({message:"Invalid request"})},C.any(),Lr);v.use("/api/images",ke.default.static(dt.default.join(A,"src/uploads")));v.use("/api/*",ft);v.use("/api/users",Vt);v.use("/api/products",uo);v.use("/api/orders",_o);v.use("/api/courses",ns);v.use("/api/reviews",us);v.use("/api/instructors",vs);v.use("/api/blogs",Ts);v.use("/api/wishlist",Us);v.use("/api/calls",Ws);v.use("/api/contacts",tr);v.use("/api/coupons",dr);v.use("/api/drive",vr);v.use("/api/dashboard",Cr);v.use("/api/sliders",Br);v.use("/api/support",Yr);v.use("/api/admin",qr);v.use("/api/menu",an);v.use("/api/media",mn);v.use("/api/purchase",yn);v.use(wn);v.use(bn);var _n=process.env.PORT||5e3;v.listen(_n,()=>{console.log(`Server is running at port ${_n}`)});
//# sourceMappingURL=index.cjs.map
