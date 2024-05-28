CREATE TABLE IF NOT EXISTS "araçlar" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"açıklama" text NOT NULL,
	"arızalı" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "araçlar_randevular" (
	"araç_id" integer NOT NULL,
	"randevu_id" integer NOT NULL,
	CONSTRAINT "araçlar_randevular_araç_id_randevu_id_pk" PRIMARY KEY("araç_id","randevu_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gereçler" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"adet" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gereçler_randevular" (
	"gereç_id" integer NOT NULL,
	"randevu_id" integer NOT NULL,
	"adet" integer NOT NULL,
	CONSTRAINT "gereçler_randevular_randevu_id_gereç_id_pk" PRIMARY KEY("randevu_id","gereç_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kişiler" (
	"id" serial PRIMARY KEY NOT NULL,
	"yönetici" boolean DEFAULT false NOT NULL,
	"öğrenci_no" bigint NOT NULL,
	"ad" text NOT NULL,
	"soy_ad" text NOT NULL,
	"email" text NOT NULL,
	"şifre_hash" text NOT NULL,
	CONSTRAINT "kişiler_öğrenci_no_unique" UNIQUE("öğrenci_no"),
	CONSTRAINT "kişiler_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kişiler_projeler" (
	"kişi_id" integer NOT NULL,
	"proje_id" integer NOT NULL,
	CONSTRAINT "kişiler_projeler_kişi_id_proje_id_pk" PRIMARY KEY("kişi_id","proje_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projeler" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"başlangıç_tarihi" date NOT NULL,
	"bitiş_tarihi" date NOT NULL,
	"açıklama" text NOT NULL,
	CONSTRAINT "projeler_ad_unique" UNIQUE("ad")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "randevular" (
	"id" serial PRIMARY KEY NOT NULL,
	"açıklama" text NOT NULL,
	"proje_id" integer NOT NULL,
	"gün" date NOT NULL,
	"başlangıç_saat" time NOT NULL,
	"bitiş_saat" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tatiller" (
	"id" serial PRIMARY KEY NOT NULL,
	"başlangıç_tarihi" date NOT NULL,
	"bitiş_tarihi" date NOT NULL,
	"açıklama" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ziyaretler" (
	"id" serial PRIMARY KEY NOT NULL,
	"gün" date NOT NULL,
	"başlangıç_saat" time NOT NULL,
	"bitiş_saat" time NOT NULL,
	"ziyaret_eden" text NOT NULL,
	"ziyaretçi_sayısı" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "araçlar_randevular" ADD CONSTRAINT "araçlar_randevular_araç_id_araçlar_id_fk" FOREIGN KEY ("araç_id") REFERENCES "public"."araçlar"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "araçlar_randevular" ADD CONSTRAINT "araçlar_randevular_randevu_id_randevular_id_fk" FOREIGN KEY ("randevu_id") REFERENCES "public"."randevular"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gereçler_randevular" ADD CONSTRAINT "gereçler_randevular_gereç_id_gereçler_id_fk" FOREIGN KEY ("gereç_id") REFERENCES "public"."gereçler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gereçler_randevular" ADD CONSTRAINT "gereçler_randevular_randevu_id_randevular_id_fk" FOREIGN KEY ("randevu_id") REFERENCES "public"."randevular"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kişiler_projeler" ADD CONSTRAINT "kişiler_projeler_kişi_id_kişiler_id_fk" FOREIGN KEY ("kişi_id") REFERENCES "public"."kişiler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kişiler_projeler" ADD CONSTRAINT "kişiler_projeler_proje_id_projeler_id_fk" FOREIGN KEY ("proje_id") REFERENCES "public"."projeler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "randevular" ADD CONSTRAINT "randevular_proje_id_projeler_id_fk" FOREIGN KEY ("proje_id") REFERENCES "public"."projeler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
