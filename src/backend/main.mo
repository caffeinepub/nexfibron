import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  type ContactForm = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    author : Text;
    date : Int;
    image : ?Storage.ExternalBlob;
    published : Bool;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    image : ?Storage.ExternalBlob;
  };

  type Order = {
    id : Nat;
    productId : Nat;
    customerName : Text;
    email : Text;
    phone : Text;
    quantity : Nat;
    specifications : Text;
    status : Text;
  };

  module Product {
    public func compareById(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };

    public func compareByName(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  module BlogPost {
    public func compareByDate(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Int.compare(post1.date, post2.date);
    };

    public func compare(blogPost1 : BlogPost, blogPost2 : BlogPost) : Order.Order {
      switch (compareByDate(blogPost1, blogPost2)) {
        case (#equal) { switch (Text.compare(blogPost1.title, blogPost2.title)) {
          case (#equal) {
            Text.compare(blogPost1.author, blogPost2.author);
          };
          case (order) { order };
        } };
        case (order) { order };
      };
    };
  };

  module OrderModule {
    public func compareById(order1 : Order, order2 : Order) : Order.Order {
      Nat.compare(order1.id, order2.id);
    };
  };

  module ContactForm {
    public func compareByTimestamp(form1 : ContactForm, form2 : ContactForm) : Order.Order {
      Int.compare(form1.timestamp, form2.timestamp);
    };
  };

  // Mixin authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Mixin Storage
  include MixinStorage();

  let products = Map.empty<Nat, Product>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let orders = Map.empty<Nat, Order>();
  let contactForms = Map.empty<Nat, ContactForm>();

  var nextProductId = 0;
  var nextBlogPostId = 0;
  var nextOrderId = 0;
  var nextContactFormId = 0;

  // Public function: Get all products (public catalog)
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort(Product.compareById);
  };

  // Public function: Get only published blog posts
  public query ({ caller }) func getPublishedBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray()
      .filter(func (post : BlogPost) : Bool { post.published })
      .sort();
  };

  // Admin-only: Get all blog posts (including unpublished)
  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all blog posts");
    };
    blogPosts.values().toArray().sort();
  };

  // Admin-only: Get all orders
  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray().sort(OrderModule.compareById);
  };

  // Admin-only: Get all contact form submissions
  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact forms");
    };
    contactForms.values().toArray().sort(ContactForm.compareByTimestamp);
  };

  // Admin-only: Create product
  public shared ({ caller }) func createProduct(name : Text, description : Text, category : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let product : Product = {
      id = nextProductId;
      name;
      description;
      category;
      image = null;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  // Admin-only: Create blog post
  public shared ({ caller }) func createBlogPost(title : Text, content : Text, author : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    let blogPost : BlogPost = {
      id = nextBlogPostId;
      title;
      content;
      author;
      date = Time.now();
      image = null;
      published = false;
    };
    blogPosts.add(nextBlogPostId, blogPost);
    nextBlogPostId += 1;
    blogPost.id;
  };

  // Public function: Place an order (renamed from createOrderInternal)
  public shared ({ caller }) func placeOrder(productId : Nat, customerName : Text, email : Text, phone : Text, quantity : Nat, specifications : Text) : async Nat {
    let order : Order = {
      id = nextOrderId;
      productId;
      customerName;
      email;
      phone;
      quantity;
      specifications;
      status = "pending";
    };
    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  // Public function: Submit contact form
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let contactForm : ContactForm = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactForms.add(nextContactFormId, contactForm);
    nextContactFormId += 1;
    nextContactFormId - 1;
  };

  // Admin-only: Update product
  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct : Product = {
          id;
          name;
          description;
          category;
          image = product.image;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  // Admin-only: Update blog post
  public shared ({ caller }) func updateBlogPost(id : Nat, title : Text, content : Text, author : Text, published : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?blogPost) {
        let updatedBlogPost : BlogPost = {
          id;
          title;
          content;
          author;
          date = blogPost.date;
          image = blogPost.image;
          published;
        };
        blogPosts.add(id, updatedBlogPost);
      };
    };
  };

  // Admin-only: Update order status
  public shared ({ caller }) func updateOrderStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = {
          id;
          productId = order.productId;
          customerName = order.customerName;
          email = order.email;
          phone = order.phone;
          quantity = order.quantity;
          specifications = order.specifications;
          status;
        };
        orders.add(id, updatedOrder);
      };
    };
  };

  // Admin-only: Delete product
  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // Admin-only: Delete blog post
  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    blogPosts.remove(id);
  };

  // Admin-only: Delete order
  public shared ({ caller }) func deleteOrder(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete orders");
    };
    orders.remove(id);
  };
};
