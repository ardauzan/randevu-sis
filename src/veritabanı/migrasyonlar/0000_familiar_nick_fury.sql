CREATE TABLE IF NOT EXISTS "araçlar" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"açıklama" text NOT NULL,
	"arızalı" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gereçler" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"miktar" integer NOT NULL
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
	"kişi" integer NOT NULL,
	"proje" integer NOT NULL,
	CONSTRAINT "kişiler_projeler_kişi_proje_pk" PRIMARY KEY("kişi","proje")
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
 ALTER TABLE "kişiler_projeler" ADD CONSTRAINT "kişiler_projeler_kişi_kişiler_id_fk" FOREIGN KEY ("kişi") REFERENCES "kişiler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kişiler_projeler" ADD CONSTRAINT "kişiler_projeler_proje_projeler_id_fk" FOREIGN KEY ("proje") REFERENCES "projeler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "randevular" ADD CONSTRAINT "randevular_proje_id_projeler_id_fk" FOREIGN KEY ("proje_id") REFERENCES "projeler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
